export default function server(req, res) {
  if(req.method === 'GET'){
    return res.status(200).json('GET 처리완료') // return 생략 가능
  };
  return res.status(200).json('POST 처리완료')
}



