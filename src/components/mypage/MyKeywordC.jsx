import React, { useEffect, useContext } from 'react';

import Api from 'api/Api';
import MyKeywordB from 'components/mypage/MyKeywordB';
import UserKeywordContext from 'context/UserKeywordContext';

const MyKeywordC = () => {
    const { allKeyword, setAllKeyword, recommendKeyword, setrecommendKeyword } = useContext(UserKeywordContext);

    console.log('MyKeywordC start');

    useEffect(() => {
        console.log('MyKeywordC useEffect');
        const getUserKeyword = async () => {
            await Api
                .getUserKeyword()
                .then((res) => {
                    setAllKeyword(res.data.allKeyword);
                    setrecommendKeyword(res.data.recommendKeyword);
                });
        };
        getUserKeyword();

    },[setAllKeyword, setrecommendKeyword]);
    
    return ( 
        <div className="myKeywordCW">
            <MyKeywordB keyword={allKeyword}></MyKeywordB>
            <MyKeywordB keyword={recommendKeyword}></MyKeywordB>
        </div>
    );
};

export default MyKeywordC;