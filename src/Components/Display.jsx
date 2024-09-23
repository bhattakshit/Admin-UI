

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editData, deleteData, select, deselect } from '../Store/slice.js';

function Display({ usee }) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.admin.selectedUserIds);
  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState({ id: usee.id, name: usee.name, email: usee.email, role: usee.role });
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    if (check) {
      setCheck(false);
      dispatch(deselect(usee.id));
    } else {
      setCheck(true);
      dispatch(select(usee.id));
    }
  };

  const handleDelete = () => {
    dispatch(deleteData(usee.id));
  };

  const handleEdit = () => {
    if (isEditable) {
      dispatch(editData(data));
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };

  return (
    <tr className={`${selected.includes(usee.id)? 'bg-slate-500' : ''}`}>

      <td >
        {/* <input type='checkbox' checked={check} onChange={handleCheck} /> */}
        <input type='checkbox'
       checked={selected.includes(usee.id)}
       onChange={handleCheck} />

      </td>
      <td >
        <input type='text' value={data.id} readOnly className={`${selected.includes(usee.id) ? 'bg-slate-500' : ''}`} />
      </td>
      <td>
        <input type='text' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} readOnly={!isEditable} className={`${selected.includes(usee.id)? 'bg-slate-500' : ''}`}   />
      </td>
      <td>
        <input type='text' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} readOnly={!isEditable} className={`${selected.includes(usee.id) ? 'bg-slate-500' : ''}`}/>
      </td>
      <td>
        <input type='text' value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} readOnly={!isEditable} className={`${selected.includes(usee.id) ? 'bg-slate-500' : ''}`} />
      </td>
      <td className=''>
        <button className='mr-2 ' onClick={handleEdit}>{isEditable ? "📁" : "✏️"}</button>
        <button className='px-2' onClick={handleDelete}>❌</button>
      </td>
    </tr>
  );
}

export default Display;
