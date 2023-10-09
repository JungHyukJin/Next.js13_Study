import aws from "aws-sdk"; // 라이브러리 설치
export default async function handler(req, resp) {
    //라이브러리 사용을 위한 셋팅
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    // Presigned URL 발급
    Bucket: process.env.AWS_BUCKET_NAME,
    Fields: { key: req.query.file }, // 유저가 선택한 파일명 기재
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });

  resp.status(200).json(url);
}
