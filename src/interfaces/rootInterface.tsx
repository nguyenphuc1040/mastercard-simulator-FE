

interface MasterCardType {
    Id: any;
    MasterCardId: any;
    MasterCardName: any;
    MasterCardNumber: any;
    MasterCardCCV: any;
    MasterCardExpire: any;
    MasterCardBalance: any;
    MasterCardType: any;
    MasterCardFee: any;
}

interface Transaction{
    Id: any;
    TransactionId: any;
    MasterCardNumberSend: any;
    MasterCardNumberReceive: any;
    TransactionMessage: any;
    BalanceReceiver: any;
    BalanceSender: any;
    AmountOfMoney: number;
    Fee: any;
}

interface Trans{
    Trans: Transaction;
    Card: MasterCardType;
}

export type {MasterCardType, Transaction, Trans}