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
      {[...Array(60).keys()].map(index => (
        <option key={index} value={index + 1}>{index + 1} 分钟</option>
      ))}
    </>
  );

  const settings = [
    {name: '蕃茄时长', value: 'tomatoTime', patchValue: 'tomato_minutes'},
    {name: '短休息时长', value: 'shortBreakTime', patchValue: 'short_rest_minutes'},
    {name: '长休息时长', value: 'longBreakTime', patchValue: 'long_rest_minutes'},
  ];

  const updateSetting = useCallback((name, value) => {
    const url = window.ttnote.baseUrl + '/user_settings';
    window.ttnote.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({[name]: value})
    }).then(res => console.log(res))

  }, []);

  return (
    <Container>
      {settings.map(settingObj => (
      <FormGroup key={settingObj.value}>
        <FormLabel column={false}>{settingObj.name}</FormLabel>
        <FormControl
          size={'sm'}
          as='select'
          defaultValue={window.ttnote[settingObj.value]}
          onChange={e => {
            const value = e.currentTarget.value;
            window.ttnote[settingObj.value] = value;
            updateSetting(settingObj.patchValue, value);
          }}
        >
          {minutesOptions}
        </FormControl>
      </FormGroup>
      ))}
      <FormGroup>
        <FormCheck
          defaultChecked={window.ttnote.continueBreak}
          onChange={e => {
            const value = e.target.checked;
            window.ttnote.continueBreak = value;
            updateSetting('auto_rest', value);
          }}
          type='checkbox'
          label={'蕃茄完成后直接进入休息'} />
      </FormGroup>
    </Container>
  )
}

export default Setting;