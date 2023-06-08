import kafkaConfig from "./config.js";

const sendMessageToKafka = async (req, res) => {
    try {
        const { message } = req.body
        const messages = [
            {
                key: 'key',
                value: message,
                headers: {
                    'correlation-id': '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
                }
            }
        ]
        kafkaConfig.produce("my-topic", messages);
        res.status(200).json({ status: "Ok!", message: "Message successfully send!" })

    } catch (e) {
        console.log(e.message)
    }
}

const constrollers = { sendMessageToKafka };
export default constrollers;