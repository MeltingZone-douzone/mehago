import React from 'react';
import styled from 'styled-components';
import { TextField, FormControlLabel, Switch, FormControl, InputLabel, Select, makeStyles } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

export default function CreateChatForm({classes, chatRoom, handleChange, handleAddTagName, handleDeleteTagName}) {

    return(
        <FormWrapper>
            <TextField
                required className={classes.TextField}
                label="방 이름" variant="outlined"
                placeholder="방 이름을 입력하세요"
                name="title" value={chatRoom.title} onChange={handleChange} />

            <ChipInput
                className={classes.TextField} variant="outlined" name="tagName"
                label='태그를 입력하세요' placeholder='태그를 입력 후 엔터를 누르세요'
                value={chatRoom.tagName}
                onAdd={(name) => handleAddTagName(name)} onDelete={(name) => handleDeleteTagName(name)} />

            <div className={classes.password}>
                <FormControlLabel
                    control={
                        <Switch checked={chatRoom.secretRoom} onChange={handleChange}
                            name="secretRoom" color="primary" />
                    }
                    label="비밀번호"
                />
                {chatRoom.secretRoom ?
                    <TextField
                        className={classes.TextField, classes.passwordInput}
                        type="password" variant="outlined" size="small"
                        name="password" value={chatRoom.password} onChange={handleChange} />
                    : ""}
            </div>

            <FormControl color="primary" className={classes.TextField}>
                <InputLabel htmlFor="limitedUserCount">최대 인원 수</InputLabel>
                <Select
                    native
                    value={chatRoom.limitedUserCount} onChange={handleChange}
                    name="limitedUserCount" inputProps={{
                        name: "limitedUserCount",
                        id: 'limitedUserCount',
                    }} >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                    <option value={60}>60</option>
                    <option value={70}>70</option>
                    <option value={80}>80</option>
                    <option value={90}>90</option>
                    <option value={100}>100</option>
                </Select>
            </FormControl>

            <FormControlLabel
                className={classes.onlyAuthorizedSwitch} 
                control={
                    <Switch checked={chatRoom.onlyAuthorized} onChange={handleChange}
                        name="onlyAuthorized" color="primary" />}
                label="회원만 이용 가능" />

            <FormControlLabel
                className={classes.searchableSwitch} 
                control={
                    <Switch checked={chatRoom.searchable} onChange={handleChange}
                        name="searchable" color="primary" />}
                label="검색 허용" />
        </FormWrapper>
    )
}


const FormWrapper = styled.div`
    display:flex;
    flex-direction:column;

    width:100%;
    height: 100%;

    justify-content: center;
    padding:0 10px;
`