import React, { useEffect, useState , useContext } from "react";
import useForm from "../../hooks/form.js";
import Pagination from "../pagination/pagination";
import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { SettingsContext } from '../../context/settings';
import { v4 as uuid } from "uuid";
import {When} from 'react-if'
import {LoginContext} from '../../context/Login-context';
import Login from '../Login';
const ToDo = () => {
  const settings = useContext(SettingsContext);
  const login = useContext(LoginContext)
  const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) ||[]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    console.log(item);
    localStorage.setItem('list',JSON.stringify([...list, item]))
    item.id = uuid();
    item.complete = false;
    console.log("item", item);
    setList([...list, item]);
  }

    function deleteItem (id) {
      const items = list.filter((item) => item.id !== id);
      setList(items);
    }

  function toggleComplete(id) {

    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete);
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete.length}`;
        // eslint-disable-next-line
  }, [list,settings.showCompleted]);

  return (
    <>
    <When condition={login.loggedIn}>

 
      <div className="form-container">
        <header>
          <h1>To Do List: {incomplete.length} items pending</h1>
        </header>
<When condition={login.canDo('create')}> 
        <h2>Add To Do Item</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup
            helperText=""
            label="To Do Item"
            labelFor="text-input"
            labelInfo=""
          >
            <InputGroup
              id="text-input"
              placeholder="Item Details"
              onChange={handleChange}
              name="text"
            />
          </FormGroup>
          <FormGroup
            helperText=""
            label="Assigned To"
            labelFor="text-input"
            labelInfo=""
          >
            <InputGroup
              id="text-input"
              placeholder="Assignee Name"
              onChange={handleChange}
              name="assignee"
            />
          </FormGroup>
          <FormGroup
            helperText=""
            label="Difficulty"
            labelFor="text-input"
            labelInfo=""
          >
            <input
              onChange={handleChange}
              defaultValue={3}
              type="range"
              min={1}
              max={5}
              name="difficulty"
            />
          </FormGroup>
          <label>
            <Button type="submit">Add Item</Button>
          </label>
        </form>
        </When> 
      </div>

      <Pagination
        className="pagList-container"
        list={list}
        incomplete={incomplete}
        toggleComplete={toggleComplete}
        deleteItem={deleteItem}
      ></Pagination>
         </When>

         <When condition={!login.loggedIn}>
<Login/>
         </When>
    </>
  );
};

export default ToDo;
