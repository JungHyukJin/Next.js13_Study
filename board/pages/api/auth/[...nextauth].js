import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { connectDB } from "@/util/database";

// 하기 코드는 mongoDB adapter 사용 시 선언
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db('forum');
        let user = await db.collection('user_cred').findOne({email : credentials.email})
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        // console.log('1',credentials.password)
        // console.log('2',user.password)
        // 콘솔로 찍어보면 user.password는 입력한 그대로 나오지만, bcrypt.compare()함수로 암호화한 상태로 비교하는듯 보인다.
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return user
      }
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일 (로그인 상태 유지 기간 - 하루는 24 * 60 * 60)
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        // JWT에 기입할 정보, 어떤 정보들을 jwt에 담아서 유저에게 보낼지
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },

    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    // 컴포넌트에서 유저의 session 데이터를 출력할 떄, 어떤 데이터를 출력 가능하게 할지
    session: async ({ session, token }) => {
      session.user = token.user; //유저 모든 정보
      return session;
    },
  },

  secret: process.env.SECRET_KEY,
  // mongoDB adapter 사용
  // adapter : MongoDBAdapter(connectDB), // 추가
};
export default NextAuth(authOptions);
