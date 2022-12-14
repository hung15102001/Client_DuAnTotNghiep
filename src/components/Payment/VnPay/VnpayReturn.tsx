import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { editAuth } from '../../../api/user'
import { addNewPayemnt, vnpay_return } from '../../../api/vnpay'
import { RootState } from '../../../app/store'
import { editAuthSilce } from '../../../features/Slide/auth/authSlide'
import { UserType } from '../../../types/user'

type Props = {}

const VnpayReturn = (props: Props) => {
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  console.log("abc",auth);
  
  const [bankcode, setBankCode] = useState<any>()
  const pay_status = 1;
  const dispatch = useDispatch()
  const url = window.location.href;
  const url_split = url.split("?")
  
  useEffect(() => {
    const getData = async () => {
        const {data} = await vnpay_return(url_split[1]); 
  
        setBankCode(data)

        if(data){
          const payment = {
            userId: auth?._id,
            amount: (+data?.vnp_Amount) / 100,
            bank: data?.vnp_BankCode,
            content: data?.vnp_OrderInfo,
            code: data?.vnp_TxnRef == "00" ? 1 : 0
          }

          const user:any = {
            _id: auth._id,
            pay: pay_status
          }
          console.log(payment);
          await addNewPayemnt(payment);       
          await editAuth(user)
        }else{
          message.error("Lỗi")
        }
    }
    getData();
  },[])

  return (
    <div className=''>
         <div className="w-8/12 m-auto mt-16 border-l-[5px] pl-4 border-[#ff9933]">
         
      <div className='mt-8'>
        <h1 className="text-3xl text-center text-[#167AC6]">Hóa đơn thanh toán thành công</h1>
          <div className='flex justify-center mt-6 gap-12 border-2 w-[50%] m-auto p-4 rounded'>
              <ul>
                <li className='text-lg font-bold '>Tên tài khoản:</li>
                <li className='text-lg font-bold '>Tổng tiền:</li>
                <li className='text-lg font-bold '>Ngân hàng:</li>
                <li className='text-lg font-bold '>Nội dung:</li>
                <li className='text-lg font-bold '>Mã hóa đơn:</li>
                <li className='text-lg font-bold '>Thời gian:</li>
                <li className='text-lg font-bold '>Trạng thái:</li>
              </ul>
              
              <ul>
                <li className='text-lg font-bold '>{auth.username}</li>
                <li className='text-lg font-bold '>{(+bankcode?.vnp_Amount) / 100} <span className='text-[#ff9933]'>vnđ</span></li>
                <li className='text-lg font-bold '>{bankcode?.vnp_BankCode}</li>
                <li className='text-lg font-bold '>{bankcode?.vnp_OrderInfo}</li>
                <li className='text-lg font-bold '>{bankcode?.vnp_TxnRef}</li>
                <li className='text-lg font-bold '>{bankcode?.vnp_PayDate}</li>
                <li className='text-lg font-bold '>{bankcode?.vnp_ResponseCode == "00" ? <span className='text-[#167AC6]'>Thành công</span>: <span className='text-red-500'>Thất bại</span> }</li>
              </ul>
          </div>
      </div>
    </div>
    </div>
  )
}

export default VnpayReturn