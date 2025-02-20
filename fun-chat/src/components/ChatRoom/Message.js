import { Avatar, Typography } from 'antd'
import { formatRelative } from 'date-fns';
import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
    margin-bottom:10px;
    .author {
        margin-left:5px;
        font-weight:bold;
    }
    .date {
        margin-left:10px;
        font-size:11px;
        color:#a7a7a7;
    }
        .content {
            margin-left:15px;
        }
    }
`
function formatDate (seconds) {
    let formatedDate ='';
    if(seconds)
    formatedDate = formatRelative(new Date(seconds*1000),new Date());
    // formatedDate = formatedDate.charAt(0).toUpperCase+ formatedDate.slice(1);
    return formatedDate;
}
export default function Message({text,displayName,createAt,photoURL}) {
  return (
    <WrapperStyled>
        <div>
            <Avatar size='small' src={photoURL}>A</Avatar>
            <Typography.Text className='author'>{displayName}</Typography.Text>
            <Typography.Text className='date'> {createAt?.seconds ? formatDate(createAt.seconds) : "No date available"}</Typography.Text>           
        </div>
        <div>
            <Typography.Text className='content'>{text}</Typography.Text>
        </div>
    </WrapperStyled>
  )
}
