import { useEffect,useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다. 
// 2. 날씨정보에는 도시, 섭씨, 화씨 날씨상태
// 3. 5개의 버튼이 있다.(현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다. 
// 5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재위치 기반으로 돌어온다. 
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState(''); // 선택된 버튼 상태
  const [loading, setLoading] = useState(false);
  const [apiError,setApiError] = useState("");

  const cities = ['Seoul', 'Paris', 'Tokyo', 'Suisse'];
  
  // 현재 위치 정보 가져오는 함수
  const getCurrentLocation = () => {
    // console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      // console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
      setSelectedCity('current'); // 현재 위치 버튼이 선택
    });
  }

  // 현재 위치 기반 날씨 정보
  const getWeatherByCurrentLocation = async(lat, lon) => {
    try{
      // 로딩 상태 시작
      setLoading(true);
      let url = (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d79a77dc95d37d09aa8e5bb0ccaab03d&units=metric`);
      let response = await fetch(url);
      let data = await response.json();
      // console.log("data", data);
      
      setWeather(data);
    }catch (err) {
      setApiError(err.message);
    }finally {
      setLoading(false); // 로딩 상태 종료
    }
  }

  // 도시별 날씨 정보
  const getWeatherByCity = async() => {
    try{
      setLoading(true);
      let url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d79a77dc95d37d09aa8e5bb0ccaab03d&units=metric`);
      let response = await fetch(url);
      let data = await response.json();
      // console.log("data",data);

      setWeather(data);
    }catch (err){
      setApiError(err.message);
    }finally {
      setLoading(false); // 로딩 상태 종료
    }
  }

  useEffect(() => {
    if(city == ""){
      getCurrentLocation(); // 현재 위치 기반 날씨 정보 가져오기
    }else{
      getWeatherByCity(); // 선택된 도시의 날씨 정보 가져오기
      setSelectedCity(city); // 도시 선택 시 selectedCity 업데이트
    }
  }, [city]);



  return (
    <div>
      {loading?<ClipLoader color="#3fb4de" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/> : <div className='container'>  
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities} setCity={setCity} getCurrentLocation= {getCurrentLocation} selectedCity={selectedCity}/>
      </div>}
    </div>
  );
}

export default App;