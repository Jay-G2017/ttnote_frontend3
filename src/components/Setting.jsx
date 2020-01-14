import React, {useCallback} from "react";
import {FormGroup, FormLabel, FormControl, FormCheck} from 'react-bootstrap';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem 3rem;
  font-weight: 500;
`;

function Setting() {
  const minutesOptions = (
    <>
      <option key={0.1} value={0.1}>6秒</option>
      <option key={0.2} value={0.2}>12秒</option>
      <option key={0.3} value={0.3}>18秒</option>
      <option key={0.4} value={0.4}>24秒</option>
      <option key={0.5} value={0.5}>30秒</option>
      <option key={0.6} value={0.6}>36秒</option>
      {[...Array(60).keys()].map(index => (
        <option key={index} value={index + 1}>{index + 1} 分钟</option>
      ))}
    </>
  );

  const settings = [
    {name: '蕃茄时长', key: 'tomatoMinutes', patchKey: 'tomato_minutes'},
    {name: '短休息时长', key: 'shortRestMinutes', patchKey: 'short_rest_minutes'},
    {name: '长休息时长', key: 'longRestMinutes', patchKey: 'long_rest_minutes'},
  ];

  const updateSetting = useCallback((name, value) => {
    const url = window.ttnote.baseUrl + '/user_settings';
    window.ttnote.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({[name]: value})
    }).then(res => {
      localStorage.setItem('ttnoteUserSetting', JSON.stringify(res));
      window.ttnote.userSetting = res;
    })

  }, []);

  return (
    <Container>
      {settings.map(settingObj => (
      <FormGroup key={settingObj.key}>
        <FormLabel column={false}>{settingObj.name}</FormLabel>
        <FormControl
          size={'sm'}
          as='select'
          defaultValue={window.ttnote.userSetting[settingObj.key]}
          onChange={e => {
            const value = e.currentTarget.value;
            window.ttnote.userSetting[settingObj.key] = value;
            updateSetting(settingObj.patchKey, value);
          }}
        >
          {minutesOptions}
        </FormControl>
      </FormGroup>
      ))}
      <FormGroup>
        <FormCheck
          defaultChecked={window.ttnote.userSetting.autoRest}
          onChange={e => {
            const value = e.target.checked;
            window.ttnote.userSetting.autoRest = value;
            updateSetting('auto_rest', value);
          }}
          type='checkbox'
          label={'蕃茄完成后直接进入休息'} />
      </FormGroup>
    </Container>
  )
}

export default Setting;