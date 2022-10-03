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
    serverTimestamp,
    addDoc,
} from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import { createChatHistory } from '../firestore functions';

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

export default function ChatWindow(props) {
    const [virtualList, setVirtualList] = useState([]);
    const navigate = useNavigate();
    const virtuoso = useRef(null);

    useEffect(() => {
        if (props.usreID === null) {
            console.log('userID not found.');
            return;
        }
        if (props.docRef === null) {
            return;
        }

        createChatHistory(
            props.docRef.uDocRef,
            props.docRef.dDocRef,
            serverTimestamp(),
            '<Automated Message>',
            'Hi there! Feel free to ask me anything about your health.'
        );
        // Get chat history collection, order by timestamp:
        const chat_history_q = query(
            collection(props.docRef.uDocRef, 'ChatHistory'),
            orderBy('timestamp')
        );

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
    }, []);

    return (
        <Virtuoso
            ref={virtuoso}
            style={{ minHeight: 'inherit', flexGrow: 1, display: 'flex' }}
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
