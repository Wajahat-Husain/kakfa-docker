import { Kafka } from "kafkajs";

const KafkaConfig = async () => {

    const kafka = new Kafka({
        clientId: 'Kafka-nodejs',
        brokers: ['localhost:9092'],
    })
    return kafka;

}

const produce = async (topic, message) => {

    const kafka = await KafkaConfig()
    const producer = kafka.producer();
    try {

        await producer.connect()
        await producer.send({
            topic: topic,
            messages: message,
        })

    } catch (e) {
        console.log(e.message)
    } finally {
        await producer.disconnect()
    }
}

const consume = async (topic, callback) => {

    const kafka = await KafkaConfig()
    const consumer = kafka.consumer({ groupId: 'test-group' })
    try {

        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const key = message.key.toString();
                const value = message.value.toString();
                const headers = message.headers;
                const data = { key, value, headers };
                callback(data)
            },
        })

    } catch (e) {
        console.log(e.message)
    }
}

const kafkaConfig = { produce, consume };
export default kafkaConfig;