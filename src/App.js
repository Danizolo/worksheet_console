import logo from './logo.svg';
// import './App.css';
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function App() {

  const [projectName, setProjectName] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [isSelected, setMonthSelected] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(null);
  const [totalDays, setTotalDays] = React.useState(1);


  var dateInstance = new Date();
  const currentYear = dateInstance.getFullYear();
  var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  var dayOptions = { weekday: 'long' };

  const workSheet = [];
  const tableHeaders = [
    'Date',
    'Project Name',
    'File Name',
    'Description',
    'Status'
  ]


  function exportFile() {

    if (workSheet.length > 0) {
      var doc = new jsPDF;
      doc.autoTable({
        head: [tableHeaders],
        body: workSheet
      });
  
      doc.save('table.pdf');
    }else {
      alert('Add some worksheet')
    }

   

  }

  function daysInMonth(month, year, day) {
    return new Date(year, month, day).getDate();
  }

  function workSheetDate(param) {
    if (param === 'date') {
      var isoDateString = new Date(currentYear, currentMonth, totalDays).toLocaleDateString("en-US", options);
      return isoDateString;

    } else if (param === 'day') {
      var isoDateString = new Date(currentYear, currentMonth, totalDays).toLocaleDateString("en-US", dayOptions);
      return isoDateString;

    }


  }

  function pushToWorksheet() {

    const workedDays = daysInMonth(currentMonth, currentYear, 0);

    if (totalDays > workedDays) {
      var month = document.getElementById('MonthInput').innerHTML;
      alert('You have submitted all working days for the Month' + ' ' + month);

    } else {
      var date = workSheetDate('date');
      var currentday = workSheetDate('day');
      setTotalDays(totalDays + 1);


      if (currentday.toLowerCase() === 'saturday' || currentday.toLowerCase() === 'sunday') {
        console.log("sunday or saturday");
        workSheet.push([date, "", "", "", ""]);

      } else {
        console.log("other day");
        workSheet.push([date, projectName, fileName, description, status]);

      }

      setProjectName("");
      setFileName("");
      setDescription("");
      setStatus("");
      document.getElementById('ProjectInput').value = "";
      document.getElementById('FileInput').value = "";
      document.getElementById('DescriptionInput').value = "";
      document.getElementById('StatusInput').value = "";


    }

  }


  return (
    <div className='flex justify-center items-center'>

      {}

      <select className='border border-slate-400 bg-slate-300 m-2 px-8 text-slate-900 outline-none' id='MonthInput' onChange={(e) => { setMonthSelected(!isSelected); setCurrentMonth(e.target.value) }} disabled={isSelected}>
        <option value={null}>Select Month</option>
        <option value='0'>January</option>
        <option value='1'>Febraury</option>
        <option value='2'>March</option>
        <option value='3'>April</option>
        <option value='4'>May</option>
        <option value='5'>June</option>
        <option value='6'>July</option>
        <option value='7'>August</option>
        <option value='8'>September</option>
        <option value='9'>October</option>
        <option value='10'>November</option>
        <option value='11'>December</option>
      </select>

      <button className='border border-slate-400 bg-slate-300 m-2 px-8 text-slate-900 outline-none' onClick={() => setMonthSelected(!isSelected)} hidden={isSelected ? false : true}>Change Month</button>

      <div className='w-1/2'>

        <input type='text' id='ProjectInput' onChange={(e) => setProjectName(e.target.value)} className='border border-slate-400 bg-slate-300 m-2 px-8 text-slate-900 outline-none' placeholder='Project Name' />
        <input type='text' id='FileInput' onChange={(e) => setFileName(e.target.value)} className='border border-slate-400 bg-slate-300 m-2 px-8 text-slate-900 outline-none' placeholder='File Name' />
        <input type='text' id='DescriptionInput' onChange={(e) => setDescription(e.target.value)} className='border border-slate-400 bg-slate-300 m-2 px-8 text-slate-900 outline-none' placeholder='Description' />
        <input type='text' id='StatusInput' onChange={(e) => setStatus(e.target.value)} className='border border-slate-400 bg-slate-300 m-2 px-8 text-slate-900 outline-none' placeholder='Status' />

        <button className='border border-slate-400 bg-slate-300 m-2 px-8 text-slate-900 outline-none' onClick={pushToWorksheet}>Add</button>

      </div>
      <button className='border border-slate-400 bg-slate-300 m-2' onClick={exportFile}>
        Download Pdf
      </button>

      {/* {workSheet.map((listValue, index) => {
        return (
          <tr key={index}>
            <td>{listValue.Date}</td>
          </tr>
        );
      })} */}

    </div>
  );
}

export default App;
