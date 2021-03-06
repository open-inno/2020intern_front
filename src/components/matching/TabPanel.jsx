import React, { useState, useEffect, useContext } from 'react';

import Api from 'api/Api';
import 'style/Matching.css';
import MyVerticallyCenteredModal from 'components/matching/MyVerticallyCenteredModal';
import UserContext from 'context/UserContext';

function TabPanel(props) {
    const { value, setValue, index, state, ...other } = props;
    const [modalShow, setModalShow] = useState(false);
    const [matchingList, setMatchingList] = useState([]);
    const [pickedMatchingList, setPickedMatchingList] = useState([]);
    const { userProfile } = useContext(UserContext);

    useEffect(() => {
        console.log(value);
        if ((userProfile.type !== '')) {
            const getWaitMatchingList = async () => {
                await Api
                    .getMatchingList(userProfile.usn, userProfile.type, value)
                    .then((res) => {
                        if (res.data.matchingList !== undefined) {
                            setMatchingList(res.data.matchingList);
                        }
                    })
            }

            getWaitMatchingList();
        }

    }, [value, userProfile.usn, userProfile.type]);

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            <h1>{state.matchingType} 멘토링 요청</h1>
            {value === index && (
                <>
                    {matchingList.map((matching) => {
                        return (
                            <div key={matching.matchingId}>
                                <div onClick={() => {
                                    setModalShow(true); setPickedMatchingList(matching)
                                }} className="matchingList">
                                    {(userProfile.type === 0)
                                        ? (
                                            <div>{matching.oppositeName} 멘토</div>
                                        )
                                        : (
                                            <div>{matching.oppositeName} 멘티</div>
                                        )}
                                    <div>{matching.reqReason}</div>
                                    <div>{state.time} 시간 : {matching.timeReq}</div>
                                </div>
                            </div>
                        );
                    })}
                    <MyVerticallyCenteredModal
                        value={value}
                        setValue={setValue}
                        matchinglist={pickedMatchingList}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </>
            )}
        </div>
    );
}

export default TabPanel;