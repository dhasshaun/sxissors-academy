import {
  DynamoDBClient,
  PutItemCommand,
  PutItemInput,
} from "@aws-sdk/client-dynamodb";
import { RegistrationInfo } from "./model/RegistrationInfo";
import { v4 as uuidv4 } from "uuid";
import * as moment from "moment";

export default class Register {
  private docClient: DynamoDBClient;
  constructor() {
    this.docClient = new DynamoDBClient({
      region: "ap-southeast-1",
    });
  }
  execute = async (req: any, res: any) => {
    const data: RegistrationInfo = {
      fullname: req.body.fullname,
      email: req.body.email,
      tel: req.body.tel,
      address: req.body.address,
      course: req.body.course,
    };
    const item: PutItemInput = {
      TableName: "sandbox",
      Item: {
        id: { S: uuidv4() },
        fullname: { S: data.fullname },
        email: { S: data.email },
        tel: { S: data.tel },
        address: { S: data.address },
        course: { S: data.course },
        createdAt: { S: moment().format() },
        timestamp: { S: new Date().getTime().toString() },
      },
    };
    const command = new PutItemCommand(item);
    const response = await this.docClient.send(command);
    console.log(JSON.stringify(response));
    if (response.$metadata.httpStatusCode != 200) {
      res.status(500).send("FAILED");
    } else {
      res.status(200).send("OK");
    }
  };
}
