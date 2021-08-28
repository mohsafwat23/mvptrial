from channels.generic.websocket import AsyncWebsocketConsumer

class SwipingRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print('connected')
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'room_%s' % self.room_name
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
    
    async def disconnect(self, close_code):
        
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    pass