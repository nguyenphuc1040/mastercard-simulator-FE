import { Button, Input, InputNumber } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MasterCardType, Transaction } from "../../interfaces/rootInterface";
import "./style.css";

type QuizParams = {
  idMasterCard: string;
};

const numberWithCommas = (number: any) => {
  number = Math.round(number * 100) / 100;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function MasterCard() {
  let { idMasterCard } = useParams<QuizParams>();
  const [listTrans, setListTrans] = useState<Transaction[]>([]);
  const [cardData, setCardData] = useState<MasterCardType>();
  const [cardReceive, setCardReceive] = useState("");
  const [message, setMessage] = useState("");
  const [money, setMoney] = useState(0);

  var imgdata =
    "https://lh3.googleusercontent.com/V49H-5pa3pwr7cW1N3fqJoNn7FyVfbD8rmExVcCTf6eyOIDPMtsCAz42qsEtjDZlCWwQWBelQLDKDCNYsnt6-fh5LmRF7gMjSkPOp6aXQO2Xy4zQnrvATZhnPQ1TnXzXeyVNMkOo3lweWP3wH0dJ264jTknsUBiEN_a8HMnbI5PgoJ_bBoupYtoLzcjNWtAWB-jaOhZjhD4JqXQryNuM_kw2P93Gxr8xjE3zeHzHPa2eiccTbgOtVpVVIW0oPVWBfyEJ_SZodeqbtMV8OyQi3patvl4ISiJxeUz6P-2ahwntXgVJUog_Gs4doOEme0qQ57YydALyPQDvExz73dwqAziN98lYpHxuR90s55pAFsqubFtqJw8Xd0BKdtUorxWPN81EQz1_PTGLN_F15OdbNYAwrtcgDefQQ54clvrMnQXgD-u_x9_4Tr7e7Q6aEB80MOI1R2uUUjpVuDQ9q0q3XMpaYFenGeljvwMlXKnVmMEyiOS-4cmmXFO23vZNyk9g3CFxoPrtvXLKCty6zdlxd1q-Bkbd2UpyolZHBapJzf2IKNcQFEfVu3O3Gpxj9Bz942kQfoQBIvQ4baiK87jrtDYB18oX8w-LY1axJx9RLAnVriObztufR6o6SO5v5IPTGfKOyXRbFCAzcU11o9ZJkjPCpy7L8vj9226m3pLrFSQqrgZ-rClL3YjU0OF2Rah_4iL9rL3KnjzmHDFYPw=w1719-h975-no?authuser=2";

  const fetchDataTrans = (res: any) => {
    return axios
      .get("https://localhost:5001/api/transaction/" + res?.MasterCardNumber)
      .then((response) => {
        setListTrans(response.data.reverse());
      });
  };
  const fetchDataCard = () => {
    return axios
      .get("https://localhost:5001/api/mastercard/" + idMasterCard)
      .then((response) => {
        setCardData(response.data);
        fetchDataTrans(response.data);
      });
  };

  const postCreateTrans = () => {
    axios
      .post("https://localhost:5001/api/transaction/create", {
        Trans: {
          MasterCardNumberSend: cardData?.MasterCardNumber,
          MasterCardNumberReceive: cardReceive,
          TransactionMessage: message,
          AmountOfMoney: money,
        },
        Card: {
          MasterCardName: cardData?.MasterCardName,
          MasterCardNumber: cardData?.MasterCardNumber,
          MasterCardCCV: cardData?.MasterCardCCV,
          MasterCardExpire: cardData?.MasterCardExpire,
        },
      })
      .then((response) => {
        alert(response.data);
        fetchDataCard();
      })
      .catch((error) => {
        alert(error);
      });
  };
  function onChangeMoney(value: any) {
    setMoney(value);
  }
  async function fetchDataCardStream(){
    fetchDataCard();
    setTimeout(fetchDataCardStream,1000);
  }
  useEffect(() => {
    fetchDataCardStream();
  }, []);
  return (
    <div>
      <div
        className="card-container"
        style={
          {
              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 100%),url(" +
                imgdata +
                ")",
          }
        }
      >
        <div className="card-content">
          <div className="card-balance">
            <div>
              {/* {" "}
              Refresh{" "} */}
            </div>
            <div className="card-money">{numberWithCommas(cardData?.MasterCardBalance)} $</div>
          </div>

          <div className="card-infomation">
            <div className="card-number-name">
              <div className="card-number">{cardData?.MasterCardNumber}</div>
              <div className="card-name">{cardData?.MasterCardName}</div>
            </div>
            <div className="card-cvv-exp">
              <div className="card-cvv">CCV: {cardData?.MasterCardCCV}</div>
              <div className="card-exp">EXP: {cardData?.MasterCardExpire}</div>
            </div>
          </div>
        </div>

        <div className="card-type">
          <div className="card-type-text">
            {cardData?.MasterCardType.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="transfers-container">
        <br />
        <div className="card-number">Transfers</div>
        <div className="card-exp">Card Number Receive</div>
        <Input
          placeholder="Card number receive"
          onChange={(event) => {
            setCardReceive(event.target.value);
          }}
        />
        <div className="card-exp">Amount Of Money</div>
        <InputNumber min={0} defaultValue={0} onChange={onChangeMoney} />
        <div className="card-exp">Message</div>
        <Input
          placeholder="Message"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <div className="button-sendmoney" onClick={postCreateTrans}>
          SEND
        </div>
      </div>
      <div className="transfers-history">
        <br />
        <div className="card-exp">Transaction History</div>
        {listTrans.map((data) => (
          <div className = "trans-container">
            <div className="card-exp">
                <div className = "flex">
                <div className = "message-trans">{data.TransactionMessage}</div>
                <div className = "trans-balance-text"> 20-11-2001 </div>
                </div>
              
              {data.MasterCardNumberSend !== cardData?.MasterCardNumber ? (
                <div className = "flex">
                  <div className="trans-receive-label">
                    + {numberWithCommas(data.AmountOfMoney)} $
                  </div>
                  <div>
                  <div className = "trans-balance-text">Balance</div>
                  {numberWithCommas(
                    cardData?.MasterCardBalance + data.AmountOfMoney
                  )}{" "}
                  $
                  </div>
                  
                </div>
              ) : (
                <div className = "flex">
                  <div className="trans-send-label">
                    - {numberWithCommas(data.AmountOfMoney + data.Fee)} $
                  </div>
                  <div>
                    <div className = "trans-balance-text">Balance</div>
                    {numberWithCommas(
                        cardData?.MasterCardBalance - data.AmountOfMoney - data.Fee 
                    )}{" "}
                    $
                  </div>
                 
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MasterCard;
