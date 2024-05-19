import React from 'react'
export default function Logout() {
    localStorage.removeItem("user");
    window.location.replace("/")
  return null
}
