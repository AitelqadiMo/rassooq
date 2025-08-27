import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("Rassooq User");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("user@rassooq.com");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [addresses, setAddresses] = useState<Array<{ id: string; line: string }>>([
    { id: 'addr1', line: '123 Main St, City' },
  ]);
  const [newAddress, setNewAddress] = useState("");
  const addAddress = () => { if (!newAddress) return; setAddresses(a => [...a, { id: 'addr'+Date.now(), line: newAddress }]); setNewAddress(""); };
  const removeAddress = (id: string) => setAddresses(a => a.filter(x => x.id !== id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
            <TabsTrigger value="plus">Rassooq+</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader><CardTitle>Personal Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e)=>setPhone(e.target.value)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Input placeholder="Optional" value={gender} onChange={(e)=>setGender(e.target.value)} />
                </div>
                <div>
                  <Label>Birth Date</Label>
                  <Input type="date" value={birth} onChange={(e)=>setBirth(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader><CardTitle>Manage Addresses</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {addresses.map(a => (
                    <div key={a.id} className="flex items-center justify-between border rounded p-2">
                      <span className="text-sm">{a.line}</span>
                      <Button size="sm" variant="outline" onClick={()=>removeAddress(a.id)}>Remove</Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add new address" value={newAddress} onChange={(e)=>setNewAddress(e.target.value)} />
                  <Button onClick={addAddress}>Add</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader><CardTitle>Order History</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between border rounded p-2 text-sm">
                  <span>#RS-10001</span>
                  <span className="text-green-600">Delivered</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm">Return</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded p-2 text-sm">
                  <span>#RS-10002</span>
                  <span className="text-amber-600">Cancelled</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card>
              <CardHeader><CardTitle>Wishlist</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">Use the Wishlist page for full controls.</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader><CardTitle>Saved Payment Methods</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between border rounded p-2 text-sm">
                  <span>•••• •••• •••• 4242 — VISA</span>
                  <Button size="sm" variant="outline">Remove</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input placeholder="Cardholder Name" />
                  <Input placeholder="Card Number" />
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" />
                  <div className="flex items-center gap-2 md:col-span-2">
                    <Checkbox id="savecard" />
                    <label htmlFor="savecard" className="text-sm">Save card securely for future purchases</label>
                  </div>
                </div>
                <Button>Add Card</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plus">
            <Card>
              <CardHeader><CardTitle>Rassooq+ Subscription</CardTitle></CardHeader>
              <CardContent>
                <div className="text-sm mb-2">Status: <span className="text-green-600">Active</span></div>
                <ul className="list-disc pl-5 text-sm text-muted-foreground mb-3">
                  <li>Free express delivery</li>
                  <li>Early access to deals</li>
                  <li>Priority support</li>
                </ul>
                <Button>Renew</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input placeholder="Current Password" type="password" />
                  <Input placeholder="New Password" type="password" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="news" />
                  <label htmlFor="news" className="text-sm">Email me about promotions</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="sms" />
                  <label htmlFor="sms" className="text-sm">SMS notifications</label>
                </div>
                <Button>Update Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;