import React,{useEffect, useState} from 'react'
import Layout from '../components/Layout/Layout'
import {Form,Input, Modal,DatePicker, Select, message, Table} from 'antd'
import axios from 'axios'
import { UnorderedListOutlined, AreaChartOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons'
import Spinner from '../components/Spinner.js';
import moment from 'moment';
import Analytics from '../components/Analytics.js'

const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [allTransaction,setAllTransaction] = useState([]);
    const [frequency,setFrequency] = useState('7'); //for filter(frequency)
    const [selectedDate,setSelectedDate] = useState([]);
    const [type,setType] = useState('all');
    const [viewData,setViewData] = useState('table');
    const [editable,setEditable] = useState(null);




    // talbe for showing expenses using ant Design Table
    const column =[
      {
        title:'Date',
        dataIndex:'date',//what we have written internally in model file
        render : (text)=>{
          return <span>{moment(text).format("YYYY-MM-DD")}</span>
        }
      },
      {
        title:'Amount',
        dataIndex:'amount' //what we have written internally in model file
      },
      {
        title:'Category',
        dataIndex:'category' //what we have written internally in model file
      },
      {
        title:'Reference',
        dataIndex:'reference' //what we have written internally in model file
      },
      {
        title:"Actions",
        render : (text,record)=>{
          return (
            <div>
              <EditOutlined onClick={() => {
                setEditable(record);
                setShowModal(true);
              }} />
              <DeleteOutlined onClick={()=>{deleteHandler(record)}} className='mx-2' />
            </div>
          );
        }
      }

    ]


   

    useEffect(()=>{
       // get all transaction
      const getAllTransaction = async()=>{
        try{
          const user = JSON.parse(localStorage.getItem('user'))
          setLoading(true);
          const res = await axios.post('/transaction/get-transaction',
                                      {userId:user._id, 
                                        frequency,
                                        selectedDate,
                                        type
                                      });
          setLoading(false);
          // console.log(res);
          setAllTransaction(res.data);
          // console.log(res.data);
        }catch(err){
          setLoading(false);
          console.log(err);
          message.error("Failed to get ")
        }
      };
      getAllTransaction();
    },[frequency,selectedDate,type])

    // Handle Delete
    const deleteHandler = async(record)=>{
      try{
        setLoading(true)
        await axios.post('/transaction/delete-transaction',{transactionId:record._id})
        setLoading(false);
        message.success("Transaction Deleted");
      }catch(err){
        console.log(err);
        message.err("Error While Deleting")
      }
    }
 

    // form handler
    const handleSubmit=async(values)=>{
      // console.log(values);
      try{
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
          
        if(editable){
          await axios.post("/transaction/edit-transaction",{
            payload:{
              ...values,
              userId:user._id,
              
            },
            transactionId:editable._id
          })
          setLoading(false);
          message.success("Transaction Edited Successfully");
        }else{
          await axios.post('/transaction/add-transaction',{...values,userId:user._id});
          setLoading(false);
          message.success("Transaction Added Successfully");
        }
        setShowModal(false);
        setEditable(null);
        
      }catch(err){
        setLoading(false);
        message.error("Failed");
      }
    }


  return (
    // HERE we are using layout as a tak so elements inside layout will react as child
    // those child we will be using with props in Layout
    <Layout> 
        <h1>Home Page</h1>
        {loading && <Spinner/>}


        <div className='filters d-flex align-items-center justify-content-between p-2 border border-primary'>
          <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(values)=>setFrequency(values)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
              
            </Select>
            {frequency==='custom' && <RangePicker value={selectedDate} 
                                      onChange={(values)=>setSelectedDate(values)} />} 
          </div>
          <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={(values)=>setType(values)}>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
              {frequency!=='all' && <RangePicker value={selectedDate} 
                                      onChange={(values)=>setSelectedDate(values)} />} 
            </Select>
          </div>

          <div className='mx-2 switch-icons'>
            <UnorderedListOutlined className={`mx-2 examineData ${viewData==='table' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setViewData('table')}/>
            <AreaChartOutlined className={`mx-2 examineData ${viewData==='analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setViewData('analytics')}/>
          </div>

          <div>
            <button className='btn btn-primary' onClick={()=>setShowModal(true)}>Add New</button>
          </div>

        </div>


        <div className='content'>
          {viewData==='table' ? <Table columns={column} dataSource={allTransaction}/>
                               : <Analytics allTransaction={allTransaction}/>}
          

        </div>

        <Modal
            title={editable ? 'Edit Transaction':'Add Transaction'} 
            open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
          <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
            <Form.Item label="Amount" name='amount'>
              <Input type='Number'/>
            </Form.Item>
            <Form.Item label="Type" name='type'>
              <Select>
                <Select.Option value='income'>Income</Select.Option>
                <Select.Option value='expense'>Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name='category'>
            <Select>
                <Select.Option value='salary'>Salary</Select.Option>
                <Select.Option value='tip'>Tip</Select.Option>
                <Select.Option value='project'>Project</Select.Option>
                <Select.Option value='food'>Food</Select.Option>
                <Select.Option value='bill'>Bills</Select.Option>
                <Select.Option value='medical'>Medical</Select.Option>
                <Select.Option value='fees'>Fees</Select.Option>
                <Select.Option value='other'>Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Refrence" name='refrence'>
              <Input type='text'/>
            </Form.Item>
            <Form.Item label="Description" name='description'>
              <Input type='text'/>
            </Form.Item>
            <Form.Item label="Date" name='date'>
              <Input type='date' />
            </Form.Item>
            <div className='d-flex justify-content-right'>
              <button type='submit' className='btn btn-secondary'>SAVE</button>
            </div>
          </Form>
        </Modal>
    </Layout>
  )
}

export default HomePage;