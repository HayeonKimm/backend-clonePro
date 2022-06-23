useEffect(() => {
  socket.on('receive_message', (data) => {
    console.log(data);
    setRealtime((list) => [...list, data]);

    console.log(realtime);
    const filteredRealtimeList = realtime.filter((message, index) => {
      if (message.room == room) {
        return true;
      }
    });

    setFiltedRealtimeList(filteredRealtimeList);

    console.log(filteredRealtimeList);
  });
}, [socket]);
