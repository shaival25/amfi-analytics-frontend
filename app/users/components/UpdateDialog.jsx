"use client";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import handleError from "@/validation/unauthorized";

const ToggleDialog = ({ icon, id, fetchRoles, fetchUserDetails }) => {
  const [passwordType, setPasswordType] = useState("password");
  const [updateUser, setUpdateUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [roles, setRoles] = useState([]);

  const router = useRouter();

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/${id}`,
        {
          headers: {
            "x-auth-token": Cookies.get("authToken"),
          },
        }
      );
      if (response.status === 200) {
        setUpdateUser(response.data);
        setRoles(await fetchRoles());
      }
    } catch (error) {
      handleError(error, router);
    }
  };

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };

  const saveUpdateUser = async () => {
    if (updateUser.password === "") {
      delete updateUser.password;
    }
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/${id}`,
        updateUser,
        {
          headers: {
            "x-auth-token": Cookies.get("authToken"),
          },
        }
      );
      if (response.status === 200) {
        fetchUserDetails();
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const [activeIndex, setActiveIndex] = useState(1);
  const handleNextSlide = async () => {
    const updateUser = await saveUpdateUser();
    if (updateUser) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  };

  return (
    <Dialog>
      <DialogTrigger onClick={() => fetchUserById(id)} asChild>
        {icon}
      </DialogTrigger>
      <DialogContent size="2xl" className="p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-base font-medium">
            {" "}
            Update User
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[300px]">
          <ScrollArea className="h-full px-6">
            {activeIndex === 1 && (
              <div className="sm:grid  sm:grid-cols-2 sm:gap-5 space-y-4 sm:space-y-0">
                <div className="flex flex-col gap-2">
                  <Label>User Name</Label>
                  <Input
                    value={updateUser?.username}
                    onChange={(e) =>
                      setUpdateUser({ ...updateUser, username: e.target.value })
                    }
                    type="text"
                    placeholder="Enter user name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input
                    value={updateUser?.email}
                    onChange={(e) =>
                      setUpdateUser({ ...updateUser, email: e.target.value })
                    }
                    type="text"
                    placeholder="Enter email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Role</Label>
                  <Select
                    onValueChange={(value) =>
                      setUpdateUser({ ...updateUser, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={updateUser?.role?.name} />
                    </SelectTrigger>
                    <SelectContent>
                      {roles?.map((role) => (
                        <SelectItem
                          key={role._id}
                          value={role._id}
                          checked={updateUser?.role?.name === role.name}
                        >
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Password</Label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Input
                      type={passwordType}
                      value={updateUser?.password}
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          password: e.target.value,
                        })
                      }
                      placeholder="Enter password"
                      style={{
                        width: "100%",
                      }}
                    />
                    <div
                      role="button"
                      onClick={togglePasswordType}
                      style={{
                        position: "absolute",
                        top: "25%",
                        right: "1%",
                      }}
                    >
                      {passwordType === "password" ? (
                        <Icon
                          icon="heroicons:eye"
                          className="w-5 h-5 text-default-400"
                        />
                      ) : (
                        <Icon
                          icon="heroicons:eye-slash"
                          className="w-5 h-5 text-default-400"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeIndex === 2 && (
              <div className="flex flex-col items-center ">
                <span className="text-7xl text-success">
                  <Icon icon="material-symbols:check-circle-outline" />
                </span>
                <h3 className="mt-3 text-success  text-2xl font-semibold">
                  Congratulations
                </h3>
                <p className="mt-4 text-lg font-semibold text-default-600">
                  User Updated
                </p>
              </div>
            )}
            {activeIndex === 3 && (
              <div className="flex flex-col items-center ">
                <span className="text-7xl text-danger">
                  <Icon icon="material-symbols:error-outline" />
                </span>
                <h3 className="mt-3 text-danger text-2xl font-semibold">
                  Error
                </h3>
                <p className="mt-4 text-lg font-semibold text-default-600">
                  Cannot Update User
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
        <div className="p-6 pt-4 flex justify-between">
          <DialogClose onClick={() => setActiveIndex(1)} asChild>
            <Button type="button" color="warning">
              Close
            </Button>
          </DialogClose>
          {activeIndex === 1 && (
            <Button type="submit" onClick={handleNextSlide}>
              Submit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleDialog;
