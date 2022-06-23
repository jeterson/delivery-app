package kafka
import 	(
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/jeterson/imersaofsfc2-simulator/infra/kafka"
	route2 "github.com/jeterson/imersaofsfc2-simulator/application/route"
	"encoding/json"
	"log"
	"os"
	"time"
	"fmt"
)
func Produce(msg *ckafka.Message) {
	producer := kafka.NewKafkaProducer()
	route := route2.NewRoute()
	fmt.Println("toJson")
	json.Unmarshal(msg.Value, &route)	
	fmt.Println("toJson ok")
	route.LoadPositions()
	positions, err := route.ExportJsonPositions()
	if err != nil {
		log.Println(err.Error())
	}
	for _, p := range positions {
		kafka.Publish(p, os.Getenv("KafkaProduceTopic"), producer)
		time.Sleep(time.Millisecond * 500)
	}
}