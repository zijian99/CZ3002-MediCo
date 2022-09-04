import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    TextField,
    Grid,
    Button,
    Box,
    ListItem,
    List,
    ListSubheader,
    CircularProgress,
    Typography,
} from '@mui/material';
import ChatBubble from './ChatBubble';
import { Virtuoso } from 'react-virtuoso';
import { db, auth } from '../firebase';
import {
    onSnapshot,
    query,
    collection,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';

const MUIComponents = {
    List: React.forwardRef(({ style, children }, listRef) => {
        return (
            <List
                style={{ padding: 0, ...style, margin: 0 }}
                component='div'
                ref={listRef}
            >
                {children}
            </List>
        );
    }),

    Item: ({ children, ...props }) => {
        return (
            <ListItem component='div' {...props} style={{ margin: 0 }}>
                {children}
            </ListItem>
        );
    },

    Group: ({ children, style, ...props }) => {
        return (
            <ListSubheader
                component='div'
                {...props}
                style={{
                    ...style,
                    backgroundColor: 'white',
                    margin: 0,
                }}
            >
                {children}
            </ListSubheader>
        );
    },
};

//TO DO: create a new chat history document

// Get chat history collection, order by timestamp:
const chat_history_q = query(
    collection(
        db,
        'Users/' +
            'J5WUaa4nGwxCan4NG14c' +
            '/ConsultHistory/' +
            'w9BczbnDeH8QKzdWCoMv' +
            '/ChatHistory'
    ),
    orderBy('timestamp')
); // Placeholder userID for testing

export default function ChatWindow(props) {
    const [virtualList, setVirtualList] = useState([]);
    const navigate = useNavigate();
    const virtuoso = useRef(null);

    useEffect(() => {
        if (props.userName == null) {
            console.log('userName not found.');
        }

        //Update chat list upon change
        const unsubscribe = onSnapshot(chat_history_q, (querySnapshot) => {
            console.log('Received message list change!');
            const chat_history = [];
            querySnapshot.forEach((doc) => {
                chat_history.push({
                    name: doc.data().from,
                    message: doc.data().msg,
                });
            });
            console.log('chat_history: ');
            console.log(chat_history);
            setVirtualList(chat_history.map((item) => item));
        });
    }, [navigate, props.userName]);

    useEffect(() => {
        console.log('virtualList: ');
        console.log(virtualList);
    }, [virtualList]);

    return (
        <Virtuoso
            ref={virtuoso}
            style={{ minHeight: '50vh', flexGrow: 1, display: 'flex' }}
            data={virtualList}
            initialTopMostItemIndex={virtualList.length - 1}
            followOutput='smooth'
            components={MUIComponents}
            itemContent={(index, item) => {
                return (
                    <ChatBubble
                        message={item['message']}
                        userName={item['name']}
                        type={
                            item['name'] == props.userName ? 'sent' : 'received'
                        }
                    />
                );
            }}
        ></Virtuoso>
    );
}
