// import {
//   DynamoDBClient,
//   PutItemCommand,
//   PutItemInput,
// } from "@aws-sdk/client-dynamodb";
// import { RegistrationInfo } from "./model/RegistrationInfo";
// import { v4 as uuidv4 } from "uuid";
// import * as moment from "moment";
import axios from 'axios';
import * as qs from 'qs';

export default class Register {
  // private docClient: DynamoDBClient;
  // constructor() {
  //   this.docClient = new DynamoDBClient({
  //     region: "ap-southeast-1",
  //   });
  // }
  // execute = async (req: any, res: any) => {
  //   const data: RegistrationInfo = {
  //     fullname: req.body.fullname,
  //     email: req.body.email,
  //     tel: req.body.tel,
  //     address: req.body.address,
  //     course: req.body.course,
  //   };
  //   const item: PutItemInput = {
  //     TableName: "sandbox",
  //     Item: {
  //       id: { S: uuidv4() },
  //       fullname: { S: data.fullname },
  //       email: { S: data.email },
  //       tel: { S: data.tel },
  //       address: { S: data.address },
  //       course: { S: data.course },
  //       createdAt: { S: moment().format() },
  //       timestamp: { S: new Date().getTime().toString() },
  //     },
  //   };
  //   const command = new PutItemCommand(item);
  //   const response = await this.docClient.send(command);
  //   console.log(JSON.stringify(response));
  //   if (response.$metadata.httpStatusCode != 200) {
  //     res.status(500).send("FAILED");
  //   } else {
  //     res.status(200).send("OK");
  //   }
  // };
  execute = async (req: any, res: any) => {
    const user = {
      fullname: req.body.fullname,
      email: req.body.email,
      tel: req.body.tel,
      address: req.body.address,
      course: req.body.course
    }

    const data = qs.stringify({
      'message': await this.getNotifyContent(user) 
    });
    var config = {
      method: 'post',
      url: 'https://notify-api.line.me/api/notify',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': 'Bearer XbajmGuMfYqj2RkhKmaKpnBUr30kZxBPDjGfs7YI9SA'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  private async getNotifyContent(user: any): Promise<string> {
    return `\nชื่อ : ${user['fullname']}\nเบอร์โทร : ${user['tel']}\nemail : ${user['email']}\naddress : ${user['address']}\ncourse : ${this.getCourseNameThai(user['course'])}`
  }

  private getCourseNameThai(courseNameEn: string): string {
    switch(courseNameEn) {
      case 'cutting':
        return 'คอร์สตัดผมชาย'
      case 'perming':
        return 'คอร์สดัด-ยืดผมชาย'
      case 'dyeing':
        return 'คอร์สทำสีผมแฟชั่น'
      case 'full':
        return 'Full Course'
      default:
        return 'ไม่ระบุ'
    }
  }
}
