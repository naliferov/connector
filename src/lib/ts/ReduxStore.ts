import {PostData} from "../../browser/ts/ui/components/post/Post";
import { combineReducers, Reducer } from 'redux';
import {postReducer} from "../../browser/ts/ui/components/post/PostReducer";
import {githubReducer, GithubData} from "../../browser/ts/ui/components/sign/GithubReducer";
import {createReducer} from "@reduxjs/toolkit";

export interface IStoreState {
    isUserAuthorized: boolean;
    github: GithubData;
    postData: PostData;
}

const reduxStore = (): Reducer<IStoreState> => {
    return combineReducers({
        github: githubReducer,
        postData: postReducer,
        isUserAuthorized: createReducer(false, (builder) => {})
    });
}

export default reduxStore;