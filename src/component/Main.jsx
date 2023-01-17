import React, { Component } from 'react';
import axios from "axios";

const serverUrl = "http://ec2-52-78-154-77.ap-northeast-2.compute.amazonaws.com:9000";
// const serverUrl = "http://localhost:9000";
const currentUrl = window.location.href;

class Main extends Component {
    state = {
        isLoading:true,
        location:[],
        data:[]
    };
    
    // 1. geolocation api 내위치 사용
    // 2. 좌표를 구한뒤 공공데이터 api 로 측정소 위치 구하기
    // 3. 측정소 위치의 미세먼지 정보 구하기            
    getLocation = async () => {
        if('geolocation' in navigator) {
            /* 위치정보 사용 가능 */
    
            navigator.geolocation.getCurrentPosition(pos => {
                let latitude = pos.coords.latitude;
                let longitude = pos.coords.longitude;
                let textContent = 'Your location data is ' + latitude + ', ' + longitude;
                console.log(textContent);
    
                if(currentUrl.indexOf('https') > -1){
                    // http로 이동
                    window.location.href='http://'+window.location.host+'/?latitude='+latitude+'&longitude='+longitude;
                } else {
                    this.getDustInfo(latitude, longitude);
                }
            }, err => {
                console.log(err);

                // 테스트 코드 작성
                const params = new URLSearchParams(window.location.search);
                this.getDustInfo(params.get('latitude'), params.get('longitude'));
            });
        } else {
            /* 위치정보 사용 불가능 */
            console.log('위치정보 사용 불가능');
        }
    }

    getDustInfo(latitude, longitude) {
        // 1. 통계청 auth key 생성
        let url1 = serverUrl + "/datago/sgisAuth";
        axios.get(url1).then((response1) => {
            // console.log(JSON.parse(response.data).response.body);
            console.log(response1.data.result);
            let param1 = response1.data.result.accessToken;
             
            // 2. 통계청 TM 좌표로 변환 생성
            let url2 = serverUrl + "/datago/sgisTM?accessToken=" + encodeURIComponent(param1)
                                                    + "&latitude="+ encodeURIComponent(latitude)
                                                    + "&longitude=" + encodeURIComponent(longitude);
            axios.get(url2).then((response2) => {
                console.log(response2.data.result);
                let posX = response2.data.result.posX;
                let posY = response2.data.result.posY;
                
                // 3. 미세먼지 근접측정소 검색
                let url3 = serverUrl + "/datago/Mmethod2?posX="+ encodeURIComponent(posX)
                                                            + "&posY=" + encodeURIComponent(posY);

                axios.get(url3).then((response3) => {
                    console.log(JSON.parse(response3.data).response.body);

                    // index 0을 가장 가까운 측정소로 한다
                    let locations = JSON.parse(response3.data).response.body.items;
                    this.setState({ location: locations, isLoading: true });

                    // 4. 미세먼지 정보 GET
                    let url4 = serverUrl + "/datago/Amethod1"
                                            + "?stationName="+ encodeURIComponent(locations[0].stationName);

                    axios.get(url4).then((response4) => {
                        console.log(JSON.parse(response4.data).response.body);
                        
                        let datas = JSON.parse(response4.data).response.body.items;
                        this.setState({ data: datas, isLoading: false });
                    });
                });
            });
        });
    }

    componentDidMount(){
        this.getLocation();
    }
    
    render() {
        const {isLoading, location, data} = this.state;

        return(
            <section className="container">
              {isLoading ? (
                <div className="loader">
                  <span className="loader_text">Loading...</span>
                </div>
              ):(
                <div>
                    내주변 측정소 : {location[0].stationName} 측정소 <br/>
                    측정 시간 : {data[0].dataTime} <br/>
                    미세먼지 : {data[0].pm10Value} ㎍/㎥<br/>
                    초미세먼지 : {data[0].pm25Value} ㎍/㎥
                </div>
              )}
            </section>
        )
    }
        
}
export default Main; 

