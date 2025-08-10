"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Verified: {user.isVerified ? "Yes" : "No"}</p>
      <p>{user.createdAt}</p>
      <p>{user.name}</p>
       <p>{user.bio}</p>
       <div>
        {user.Post.map((name:any,id:any)=>{
               return (
                <div key={id}>
                  <h1>{name.id}</h1>
                  <p>{name.type}</p>
                </div>
               )
        })}
       </div>
    </div>
  );
}
