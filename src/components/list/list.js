import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import {LoginContext} from '../../context/Login-context';
import {useContext} from 'react';
import {When} from 'react-if'
export default function List(props) {
const login = useContext(LoginContext);
  return (
    <>
      {props.activeList.map((item) => (
        <div className='cardsContainer'>
          <Card interactive={true} elevation={Elevation.TWO} key={item.id} className='card'>
            <When condition={login.canDo('delete')}> 
          <Button onClick={() => props.deleteItem(item.id)}>Remove</Button>
          </When>
            <p>{item.text}</p>
            <p>
              <small>Assigned to: {item.assignee}</small>
            </p>
            <p>
              <small>Difficulty: {item.difficulty}</small>
            </p>
            <Button onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete?.toString()}</Button>
          </Card>
          <br />
        </div>
      ))}
    </>
  );
}