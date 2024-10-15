"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type Room = {
  id: string;
  name: string;
};

type Item = {
  id: string;
  name: string;
  roomId: string;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchRooms();
      fetchItems();
    }
  }, [status, router]);

  const fetchRooms = async () => {
    const response = await fetch('/api/rooms');
    if (response.ok) {
      const data = await response.json();
      setRooms(data);
    }
  };

  const fetchItems = async () => {
    const response = await fetch('/api/items');
    if (response.ok) {
      const data = await response.json();
      setItems(data);
    }
  };

  const handleAddRoom = async () => {
    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newRoomName }),
    });

    if (response.ok) {
      setNewRoomName('');
      fetchRooms();
    }
  };

  const handleAddItem = async () => {
    if (!selectedRoom) return;

    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItemName, roomId: selectedRoom.id }),
    });

    if (response.ok) {
      setNewItemName('');
      fetchItems();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {rooms.map((room) => (
                <li key={room.id} className="flex justify-between items-center">
                  <span>{room.name}</span>
                  <Button onClick={() => setSelectedRoom(room)}>Select</Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Label htmlFor="newRoom">Add New Room</Label>
              <div className="flex mt-2">
                <Input
                  id="newRoom"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="mr-2"
                />
                <Button onClick={handleAddRoom}>Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Items in {selectedRoom?.name || 'No Room Selected'}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRoom && (
              <>
                <ul className="space-y-2">
                  {items
                    .filter((item) => item.roomId === selectedRoom.id)
                    .map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
                <div className="mt-4">
                  <Label htmlFor="newItem">Add New Item</Label>
                  <div className="flex mt-2">
                    <Input
                      id="newItem"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="mr-2"
                    />
                    <Button onClick={handleAddItem}>Add</Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}