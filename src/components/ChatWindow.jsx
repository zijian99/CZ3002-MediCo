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
} from '@mui/material';
import ChatBubble from './ChatBubble.jsx';
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

export default function ChatWindow(props) {
    const [currentList, setCurrentList] = useState([]);

    const navigate = useNavigate();
    const virtuoso = useRef(null);

    useEffect(() => {
        if (props.userName == null) {
            console.log('userName not found.');
        }

        // Get consult history collection, order by timestamp:
        const consult_history_q = query(
            collection(
                db,
                'Users/' + 'J5WUaa4nGwxCan4NG14c' + '/ConsultHistory'
            ),
            orderBy('dateTime', 'desc'),
            limit(1)
        ); // Placeholder userID for testing

        const getConsultationID = async () => {
            let document_id = null;
            const snapShot = await getDocs(consult_history_q);
            snapShot.forEach((doc) => {
                document_id = doc.id;
                console.log(document_id);
                const q = query(
                    collection(
                        db,
                        'Users/' +
                            'J5WUaa4nGwxCan4NG14c' +
                            '/ConsultHistory/' +
                            document_id +
                            '/ChatHistory'
                    ),
                    orderBy('timestamp')
                );

                //Update chat list upon change
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    console.log('Received message list change!');
                    const chat_history = [];
                    querySnapshot.forEach((doc) => {
                        chat_history.push({
                            name: doc.data().from,
                            message: doc.data().msg,
                        });
                    });
                    setCurrentList(chat_history.map((item) => item));
                    console.log(currentList);
                    console.log(chat_history);
                });
            });
        };

        getConsultationID();
    }, [navigate, props.userName]);

    return (
        <Virtuoso
            ref={virtuoso}
            style={{ flexGrow: 1, display: 'flex' }}
            data={currentList}
            initialTopMostItemIndex={currentList.length - 1}
            followOutput='smooth'
            components={MUIComponents}
            itemContent={(index, item) => {
                return (
                    <ChatBubble
                        message={item['message']}
                        type={
                            item['name'] == props.userName ? 'sent' : 'received'
                        }
                        userName={item['name']}
                    ></ChatBubble>
                );
            }}
        ></Virtuoso>
    );
}
