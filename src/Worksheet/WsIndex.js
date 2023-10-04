import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Constants from '../Utilities/Constants'
import { Functions } from '../Utilities/UFunctions'
import Header from '../Components/Header'



function WorkSheetIndex() {

    var dateInstance = new Date();
    const currentYear = dateInstance.getFullYear();

    const [projectName, setProjectName] = React.useState("");
    const [fileName, setFileName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [isSelected, setMonthSelected] = React.useState(false);
    const [currentMonth, setCurrentMonth] = React.useState("");
    const [workedDays, setworkedDays] = React.useState(1);
    const [workSheet] = React.useState([]);
    const [workSheetTable] = React.useState([]);
    const [monthName, setMonthName] = React.useState("WorkSheet");



    function exportFile() {

        if (workSheet.length > 0) {
            var doc = new jsPDF;
            doc.autoTable({
                head: [Constants.workSheetHeaders],
                body: workSheet
            });

            doc.save(monthName + '_WorkSheet_' + '.pdf');
            reload();
        } else {
            alert('Add some worksheet')
        }

    }

    function reload() {
        window.location.reload();
    }

    function pushToWorksheet() {

        if (currentMonth.length === 0) {
            alert("Please Select Month and Continue...")

        }


        if (projectName.length === 0 || status.length === 0) {
            alert("Project or Status needs to be filled...")

        } else {
            const workingDays = Functions.daysInMonth(currentMonth, currentYear, 0);
            if (workedDays > workingDays) {
                alert('You have submitted all working days for the Month' + ' ' + monthName);

            } else {
                var date = Functions.workSheetDate('date', currentYear, currentMonth, workedDays);
                var currentday = Functions.workSheetDate('day', currentYear, currentMonth, workedDays);
                setworkedDays(workedDays + 1);


                if (currentday.toLowerCase() === 'saturday' || currentday.toLowerCase() === 'sunday') {
                    workSheet.push([date, "", "", "", ""]);
                    workSheetTable.push([{ "Id": workedDays, "Date": date, "ProjectName": "", "FileName": "", "Description": "", "Status": "" }]);


                } else {
                    workSheet.push([date, projectName, fileName, description, status]);
                    workSheetTable.push([{ "Id": workedDays, "Date": date, "ProjectName": projectName, "FileName": fileName, "Description": description, "Status": status }]);


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



    }


    function triggerMonthEvent(e) {
        const monthNameInput = Constants.monthName[document.getElementById('MonthInput').value];
        setMonthSelected(!isSelected);
        setCurrentMonth(e.target.value);
        setMonthName(monthNameInput);
    }


    return (
        <div className=''>
            <img src='' />
            <Header />

            <div className='flex justify-center items-center h-screen'>
                <div className='absolute flex-col gap-2 rounded-2xl text-xs shadow shadow-xl bg-white p-4'>
                    <div>
                        <p className='text-slate-900 font-bold '>
                            Download Worksheet
                        </p>
                    </div>


                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-2 m-2 bg-teal-300 p-2 rounded-xl'>
                            <div className=''>
                                <select className='border border-slate-400 bg-slate-100 text-slate-900 outline-none px-4 py-2 rounded-full' id='MonthInput' onChange={(e) => triggerMonthEvent(e)} disabled={isSelected}>
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
                            </div>
                            <div>
                                <button className='border border-slate-400 bg-slate-100 text-slate-900 hover:text-white hover:bg-teal-500 outline-none py-2 w-full rounded-full' onClick={() => { setMonthSelected(!isSelected); window.location.reload() }} hidden={isSelected ? false : true}>Change Month</button>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 w-3/4'>
                            <div>
                                <select
                                    type='text'
                                    id='ProjectInput'
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className='border border-slate-400 bg-slate-100 m-2 px-8 py-2 text-slate-900 outline-none rounded-full'
                                >
                                    <option value={null}>Select Project</option>
                                    <option value='Hrms'>Hrms</option>
                                    <option value='I2I'>I2I</option>
                                </select>
                                <input
                                    type='text'
                                    id='FileInput'
                                    onChange={(e) => setFileName(e.target.value)}
                                    className='border border-slate-400 bg-slate-100 m-2 px-8 py-2 text-slate-900 outline-none rounded-full '
                                    placeholder='File Name' />
                                <input
                                    type='text'
                                    id='DescriptionInput'
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='border border-slate-400 bg-slate-100 m-2 px-8 py-2 text-slate-900 outline-none rounded-full'
                                    placeholder='Description' />
                                <select
                                    type='text'
                                    id='StatusInput'
                                    onChange={(e) => setStatus(e.target.value)}
                                    className='border border-slate-400 bg-slate-100 m-2 px-8 py-2 text-slate-900 outline-none rounded-full'
                                >
                                    <option value={null}>Select Status</option>
                                    <option value='Completed'>Completed</option>
                                    <option value='Pending'>Pending</option>
                                </select>
                            </div>

                            <div>
                                <button
                                    className='border border-slate-400 bg-white hover:text-white hover:bg-teal-500 rounded-full m-2 px-4 py-2 text-slate-900 outline-none'
                                    onClick={pushToWorksheet}>
                                    Add
                                </button>
                                <button
                                    className='border border-slate-400 bg-white hover:text-white hover:bg-slate-900 rounded-full m-2 px-4 py-2 text-slate-900 outline-none'
                                    onClick={reload}>
                                    Clear All
                                </button>
                            </div>



                        </div>

                        <div className='flex justify-center items-center m-2 bg-teal-900 p-2 rounded-xl'>
                            <button className='border border-slate-400 bg-white px-4 py-4 hover:text-white hover:bg-teal-500 font-bold rounded-full' onClick={exportFile}>
                                Download Pdf
                            </button>
                        </div>

                    </div>
                </div>

                <div className='bg-red-500'>
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Project</th>
                            <th>File</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                        <tbody>
                            {workSheetTable.map(sheet =>  (

                                    <tr >
                                        {/* <td key={data[index]["Id"]}>{data[index]["Date"]}</td>
                                        <td>{data[index]["ProjectName"]}</td>
                                        <td>{data[index]["FileName"]}</td>Description
                                        <td>{data[index]["Description"]}</td>
                                        <td>{data[index]["Status"]}</td> */}

                                        <td key={sheet.Id}>{sheet.Date}</td>




                                    </tr>
                            ))
                                
                            }
                        </tbody>
                    </table>
                </div>
            </div>








        </div>
    );
}

export default WorkSheetIndex;
