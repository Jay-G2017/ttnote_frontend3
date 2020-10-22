import { get } from 'lodash';

export const getTomatoCountInProject = (projectObj) => {
    let count = (projectObj.todos || []).reduce((acc, cur) => {
        return acc + get(cur, 'tomatoes.length', 0)
    }, 0)

    count = (projectObj.titles || []).reduce((acc, cur) => {
        return acc + getTomatoCountInTitle(cur)
    }, count)

    return count
}

export const getTomatoCountInTitle = (titleObj) => {
    return (titleObj.todos || []).reduce((acc, cur) => {
        return acc + get(cur, 'tomatoes.length', 0)
    }, 0)
}