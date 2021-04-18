export interface IWeather {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: [
    {
      main: string;
    }
  ];
}

export interface IWeatherAPIResponnse {
  cod: string;
  list: IWeather[];
}

export interface IWeatherItem {
  date: string;
  temp: number;
  main: string;
}
