<script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
<script>
  const client = mqtt.connect("wss://broker.hivemq.com:8000/mqtt");
  const commandTopic = "robot/commands";
  const responseTopic = "robot/responses";

  client.on("connect", () => {
    console.log("ESP32 connected to MQTT Broker");
    client.subscribe(commandTopic);
  });

  client.on("message", (topic, message) => {
    if (topic === commandTopic) {
      const command = message.toString();
      console.log(`Received command: ${command}`);

      // Simulate actions based on the command
      let response;
      switch(command) {
        case 'MOVE_FORWARD':
          response = 'Moving forward';
          break;
        case 'MOVE_BACKWARD':
          response = 'Moving backward';
          break;
        case 'TURN_LEFT':
          response = 'Turning left';
          break;
        case 'TURN_RIGHT':
          response = 'Turning right';
          break;
        case 'STOP':
          response = 'Stopping';
          break;
        default:
          response = 'Unknown command';
      }

      // Publish the response back
      client.publish(responseTopic, response);
    }
  });
</script>
