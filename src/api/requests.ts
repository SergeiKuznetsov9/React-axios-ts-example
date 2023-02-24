import axios from "axios";
import { config } from "process";

const FIRST_API_URL = "https://jsonplaceholder.typicode.com";
const SECOND_API_URL = "https://fakerapi.it/api/v1";
















//для того чтобы в каждом запросе не дублировать API и токен, можно использовать метод defaults:

// подставляет в качестве дефолтного FIRST_API_URL
        //axios.defaults.baseURL = FIRST_API_URL;

// подставляет в качестве дефолтного указанный токен. 
// если вместо common указать post, get .., то дефолт будет применяться только для указанных типов запросов
        //axios.defaults.headers.common = {
        //  Authorization: `Bearer ${localStorage.getItem('token')}`
        //}
        //
        //axios.defaults.withCredentials = true

//после этого, запрос может выгялдить так:

        //export const getPosts2 = async () => {
        //  try {
        //    const res = await axios({
        //      url: `/posts/100`,
        //      method: "GET",
        //      params: {
        //        offset: 0,
        //        limit: 10,
        //      },
        //
        //    });
        //  } catch (error) {
        //    if (axios.isAxiosError(error)) {
        //      console.log(error.response?.data.errText);
        //    } else if (error instanceof Error) {
        //      console.log(error.message);
        //    }
        //  }
        //};
  //В запрос автоматически приклеется токен (в хедер), куки, а к пути добавится FIRST_API_URL




//Это все не очень удобно в том случае, если на бэке много микросервисов и у каждого свой API
// Для решения этого можно создать несколько экземпляров axios:

        const firstApiAxios = axios.create({
          baseURL: FIRST_API_URL,
          headers: {
            Authorization: `Bearer, dnesabfrhsd`
          },
          withCredentials: true,
        })
        
        //const secondApiAxios = axios.create({
        //  baseURL: SECOND_API_URL,
        //  headers: {
        //    Authorization: `Bearer, dnesabfrhsd`
        //  },
        //  withCredentials: true,
        //})

// теперь при написании запроса вместо axios нужно использовать firstApiAxios или secondApiAxios















//axios возвращает промис. Его можно использовать как промис или в async/await стиле
// axios({}) принимает объект конфига

// использование в качестве промиса:
export const getPosts1 = axios({
  url: `${FIRST_API_URL}/posts/`,
  method: "GET",
  // вот это вот попадет в queryParams
  params: {
    offset: 0,
    limit: 10,
  },
});

// async/await стиль

export const getPosts2 = async () => {
  try {
    const res = await axios({
      url: `${FIRST_API_URL}/posts/100`,
      method: "GET",
      // вот это вот попадет в queryParams
      params: {
        offset: 0,
        limit: 10,
      },
      // можно запихнуть
      // метод transformResponce, который может изменить данные
      // метод headers, который может изменить данные, например:
          //headers: {
          //  Authorization: `Bearer ${localStorage.getItem('token')}`
          //}
      // метод data. Тело запроса (для запросов типа post...). Можно отправить объект либо строку
      // метод timeout. время выполнения запроса - если дольше, запрос отменится. В таком запросе responce.data не будет
      // метод withCredentials: true. Тогда к запросу приепятся куки, установленные бэкендом (манипулировать ими на фронте нельзя)

      // методы  onDownloadProgress(при гет запросе) onUploadProgress(при загрузке на сервер) позволяют сделать прогрессбары
      // если данных много, то этот event периодически будет срабатывать и соолбщать в своем объекте сколько загружено
          //onDownloadProgress: function (progressEvent) {
          //  console.log(progressEvent)
          //}

      // proxy: пзволяет проксировать запрос, т.е. отправлять его на опред порт, хост, подставлять значения
      //
    });
  } catch (error) {
    // бывает так, что возникающая ошибка не яваляется экземпляром axiosа. В таком случае ее не достанешь из responce ошибки
    // поэтому это нужно проверять. Проверяется так:
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.errText);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

// направлять запросы можно немного по-другому, чем описано выше. Так, вместо указания типа запроса в конфиге, можно использовать методы объекты axios.
// в таком случае часть методов из объекта config уйдут:

export const createPosts = async () => {
  const res = await axios.post(`${FIRST_API_URL}/posts`, {
    body: "asd",
    title: "",
  });
  console.log(res)
};

export const putPosts = async () => {
  const res = await axios.put(`${FIRST_API_URL}/posts`, {
    body: "asd",
    title: "",
  });
  console.log(res)
};

export const deletePost = async () => {
  const res = await axios.delete(`${FIRST_API_URL}/posts/1`/* , {можно указать headers} */);
  console.log(res)
};











// Для перехвата запросов и ответов можно использовать интерцепторы.
// они сработают перед тем, как будет получен responce (в запросах указан как res)
// Интерцептор для response:
// первый аргумент - колбэк для обработки успешного запроса, второй - ошибки
// ниже приведен пример для обновления токена рефрешем

//firstApiAxios.interceptors.response.use(  
//  (res) => { console.log(res); return res},
//  (error) => {
//    if (axios.isAxiosError(error)) {
//      if (error.status === 401 && token) {
//          const {data} = axios.post('url/auth', {refresToken: token });
//          localStorage.set(data, 'token')
//        } else if (error instanceof Error) {
//          console.log(error.message);
//        }
//    }
//  }
//)


// так же существует интерцептор на реквест, который обрабатывает запрос перед его отправкой

// firstApiAxios.interceptors.request.use(
//   (config) => {return config }
//   (error) => {/* если что то пошло не так */}
// )

// Можно сделать подсчет времени выполнения запроса, можно устанавливать токен (вместо первого способа)





// ОТМЕНА ЗАПРОСА:

export const getPostsController = new AbortController()

export const getPosts = async () => {
  try {
    const res = await axios({
      url: `/posts/100`,
      method: "GET",
      params: {
        offset: 0,
        limit: 10,
      },
      signal: getPostsController.signal /* ВОТ СЮДА ЕГО ПЕРЕДАЕМ */

    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.errText);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

//Теперь если мы вызовим
//getPostsController.abort()
//запрос будет отменен

// при помощи axios также можно отправлять файлы на сервер. Он поддерживает formData,
// подробнее в документации про forData и postForm







//TypeScript

type Post = {
  id: number;
  userId: string;
}

export const getPostsTyped = async () => {
  try {
    const res = await axios.get<Post>(`/posts/100`, {
      params: {
        offset: 0,
        limit: 10,
      },
      signal: getPostsController.signal, /* ВОТ СЮДА ЕГО ПЕРЕДАЕМ */
    });
    console.log(res.data) // теперь data имеет все поля из type
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.errText);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
  }
};