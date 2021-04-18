import axios from "axios";
import moment from "moment";

import { IWeather, IWeatherAPIResponnse, IWeatherItem } from "./weather.dto";

import config from "../config";
import { HttpException } from "../utils/errors";

export default class NewsService {
  private location: string;
  private unit: string;

  constructor() {
    this.location = "Delhi,In";
    this.unit = "metric";
  }

  async getForcast() {
    try {
      let response = await axios.get<IWeatherAPIResponnse>(
        "http://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q: this.location,
            APPID: config.weatherAPIKey,
            units: this.unit,
          },
        }
      );

      const data: IWeatherItem[] = [];

      response.data.list.forEach((value: IWeather, index) => {
        if (index % 8 === 0) {
          const date = moment(value.dt_txt).format("ddd MMM DD YYYY");

          data.push({
            date: date,
            temp: value.main.temp,
            main: value.weather[0].main,
          });
        }
      });

      return {
        count: data.length,
        unit: this.unit,
        location: this.location,
        data,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException();
    }
  }
}
