import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersReducer from './Users/UserSlice';
import postsReducer from './Posts/PostSlice';
import commentsReducer from './Comment/CommentSlice';
import messagesReducer from './Chat/ChatSlice';
  
export const allReducers = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    messages: messagesReducer,
})

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ['users']
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            serializableCheck: false
        }),
});

export const persistor = persistStore(store);