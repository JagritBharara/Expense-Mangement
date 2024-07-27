import React from 'react'
import { Flex, Progress } from 'antd';


const Analytics = ({allTransaction}) => {

    const categories = ['salary','tip','project','food','bill','medical','fee','other']
    // TOTAL TRANSACTIONS
    const totalTransaction = allTransaction.length;
    const totalIncomeTransactions = allTransaction.filter((transaction)=>transaction.type==='income')
    const totalExpenseTransactions = allTransaction.filter((transaction)=>transaction.type==='expense')
    const totalIncomePercent = (totalIncomeTransactions.length/totalTransaction)*100;
    const totalExpensePercent = (totalExpenseTransactions.length/totalTransaction)*100;


    // TOTAL TURNOVER
    const totalTurnOver = allTransaction.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );
    const totalIncomeTurnOver = totalIncomeTransactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );
    const totalExpenseTurnOver = totalExpenseTransactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );
    
    const totalIncomeTurnOverPercent =
        (totalIncomeTurnOver / totalTurnOver) * 100;
    const totalExpenseTurnOverPercent =
        (totalExpenseTurnOver / totalTurnOver) * 100;
    
    // console.log(totalTurnOver);
    // console.log(totalIncomeTurnOver);
    // console.log(totalExpenseTurnOver);
    // console.log(totalIncomeTurnOverPercent);
    // console.log(totalExpenseTurnOverPercent);

  return (
    <div class="d-flex flex-wrap">
        <div className='row m-3 '>
            <div className='col-md-25'>
                <div className='card'>
                    <div className='card-header'>
                        Total Transaction : {totalTransaction}
                    </div>
                    <div className='card-body'>
                        <h5 className='text-success'>Income : {totalIncomeTransactions.length}</h5>
                    </div>
                    <div className='card-body'>
                        <h5 className='text-danger'>Expense : {totalExpenseTransactions.length}</h5>
                    </div>
                    <div>
                        <Progress type='circle' strokeColor={'green'}
                                                 className='mx-2'
                                                 percent={totalIncomePercent.toFixed(0)} />
                        <Progress type='circle' strokeColor={'red'}
                                                 className='mx-2'
                                                 percent={totalExpensePercent.toFixed(0)} />
                    </div>
                </div>
            </div>
        </div>   
        <div className='row m-3'>
            <div className='col-md-25'>
                <div className='card'>
                    <div className='card-header'>
                        Total TurnOver : {totalIncomeTurnOver}
                    </div>
                    <div className='card-body'>
                        <h5 className='text-success'>Income : {totalIncomeTurnOver}</h5>
                    </div>
                    <div className='card-body'>
                        <h5 className='text-danger'>Expense : {totalExpenseTurnOver}</h5>
                    </div>
                    <div>
                        <Progress type='circle' strokeColor={'green'}
                                                 className='mx-2'
                                                 percent={totalIncomeTurnOverPercent.toFixed(0)} />
                        <Progress type='circle' strokeColor={'red'}
                                                 className='mx-2'
                                                 percent={totalExpenseTurnOverPercent.toFixed(0)} />
                    </div>
                </div>
            </div>
        </div>   
        <div className='row mt-3 m-3'>
            <div className='col-md-25'>
                <h4 className='m-3'>Category Wise Income</h4>
                {
                    categories.map((category)=>{
                        const amount = allTransaction
                        .filter((transaction)=>transaction.type==='income'
                        && transaction.category===category)
                        .reduce((acc,transaction)=>acc+transaction.amount,0);
                        return(
                            amount>0 &&(
                            <div className='card m-3'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalIncomeTurnOver)*100).toFixed(0)}/>
                                </div>
                            </div>
                            )
                        )
                    })
                }
            </div>
        </div>
        <div className='row mt-3 m-3'>
            <div className='col-md-25'>
                <h4 className='m-3'>Category Wise Expense</h4>
                {
                    categories.map((category)=>{
                        const amount = allTransaction
                        .filter((transaction)=>transaction.type==='expense'
                        && transaction.category===category)
                        .reduce((acc,transaction)=>acc+transaction.amount,0);
                        return(
                            amount>0 &&(
                            <div className='card m-3'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalExpenseTurnOver)*100).toFixed(0)}/>
                                </div>
                            </div>
                            )
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Analytics