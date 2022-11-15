import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/Admin/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCars } from "../../features/Car/carSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import demoimg from "../../assets/icons/image-1@2x.jpg";
import { useForm } from "react-hook-form";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function AddCar() {
  const [img, setImg] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imageName, setimageName] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      name,
      seat,
      transmission,
      fuel,
      description,
      price,
      type,
    } = data
    const carData = {
      name,
      seat,
      transmission,
      fuel,
      description,
      price,
      type,
      imageUrl
    }
    dispatch(addCar(carData))
    swal("Car Details was Added Successfully", {
      icon: "success",
    });
    navigate('/admin/cars')
  };

  var percentage = progress + "%";
  const { carData, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.car
  );

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const changeImg = (e) => {
    setImg(e.target.files[0]);
  };
  const imgUpload = (e) => {
    e.preventDefault();

    if (!img) return;
    const storageRef = ref(storage, `carImages/${img.name}`);
    setimageName(img.name);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl((prevState) => [...prevState, downloadURL]);
        });
      }
    );
    setProgress(0);
    //   setloading(false)
  };

  const TYPES = [
    { key: 0, value: "Sport" },
    { key: 1, value: "SUV" },
    { key: 2, value: "SEDAN" },
    { key: 3, value: "CUV" },
    { key: 4, value: "MICRO" },
    { key: 5, value: "HATCHBACK" },
    { key: 6, value: "ROADSTER" },
    { key: 7, value: "COUPE" },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" self-start grid  sm:p-8 p-6 bg-white gap-6 rounded-xl md:col-span-8 col-span-12 w-1/2  my-9">
          <div className="heading lg:col-span-2">
            <h1 className="text-dark text-xl font-bold">Add Car Details</h1>
            <p className="text-secondary-300 mt-1">Please Enter Car Details</p>
          </div>
          <div>
            <p className="font-semibold text-dark mb-2">Car Name</p>
            <input
              type="text"
              className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
              placeholder="Enter Car Name"
              name="name"
              {...register("name", {
                required: "Please enter name",
                minLength: { value: 3, message: "name must be 3 characters" },
              })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name?.message}</p>
            )}
          </div>
          <div>
            <p className="font-semibold text-dark mb-2">Car Type</p>

            <select
              name="type"
              className="bg-gray-100 hover:bg-zinc-100 active:bg-zinc-200 py-4 px-4 rounded-lg border-none flex justify-between items-center w-full"
              {...register("type", { required: "Please choose type of car" })}
            >
              <option className="text-zinc-500" value="" disabled selected>
                Select your Car Type
              </option>
              {TYPES.map((type) => {
                return (
                  <option className="text-zinc-500" value={type.value}>
                    {type.value}
                  </option>
                );
              })}
            </select>
            {errors.type && (
              <p className="text-red-600 text-sm">{errors.type?.message}</p>
            )}
          </div>
          <div>
            <p className="font-semibold text-dark mb-2">Car Seating Capacity</p>
            <input
              type="number"
              placeholder="Enter Car Seating Capacity"
              className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
              name="seat"
              {...register("seat", {
                required: "Please enter seating capacity of car",
              })}
            />
            {errors.seat && (
              <p className="text-red-600 text-sm">{errors.seat?.message}</p>
            )}
          </div>
          <div>
            <p className="font-semibold text-dark mb-2">Car Transmission</p>
            <input
              type="text"
              className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
              placeholder="Enter Car Transmission"
              name="transmission"
              {...register("transmission", {
                required: "Please enter transmission of car",
              })}
            />
            {errors.transmission && (
              <p className="text-red-600 text-sm">
                {errors.transmission?.message}
              </p>
            )}
          </div>
          <div>
            <p className="font-semibold text-dark mb-2">Car Fuel Capacity</p>
            <input
              type="text"
              className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
              placeholder="Enter Fuel Capacity"
              name="fuel"
              {...register("fuel", {
                required: "Please enter fuel capacity of car",
              })}
            />
            {errors.fuel && (
              <p className="text-red-600 text-sm">{errors.fuel?.message}</p>
            )}
          </div>
          <div>
            <p className="font-semibold text-dark mb-2">Car Price Per Hour</p>
            <input
              type="text"
              className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
              placeholder="Enter Price Per Hour"
              name="price"
              {...register("price", {
                required: "Please enter price per hour of car",
              })}
            />
            {errors.price && (
              <p className="text-red-600 text-sm">{errors.price?.message}</p>
            )}
          </div>
          <div className="col-span-2">
            <p className="font-semibold text-dark mb-2">Car Description</p>
            <textarea
              cols="10"
              rows="5"
              type="text"
              className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
              placeholder="Enter Car Description"
              name="description"
              {...register("description", {
                required: "Please enter description of car",
              })}
            />
            {errors.description && (
              <p className="text-red-600 text-sm">
                {errors.description?.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <p className="font-semibold text-dark mb-2">Upload Image 1</p>
            <div className="flex justify-between">
              <input
                accept="image/*"
                type="file"
                name="image0"
                className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
                {...register("image0", {
                  required: "Please upload a image of car",
                })}
                onChange={changeImg}
              />

              <button
                className=" py-2 px-6 ml-6 rounded-lg mx-auto bg-blue-600 text-white"
                onClick={imgUpload}
              >
                {" "}
                Upload
              </button>
            </div>
            {progress && imageUrl[0] ? (
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-8">
                <div
                  className="bg-zinc-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: percentage }}
                >
                  {" "}
                  {progress}%
                </div>
              </div>
            ) : null}
            {errors.image0 && (
              <p className="text-red-600 text-sm">{errors.image0?.message}</p>
            )}

            <img
              src={imageUrl[0] ? imageUrl[0] : demoimg}
              className="w-full mx-auto mt-5"
              alt=""
            />
          </div>
          <div>
            <p className="font-semibold text-dark mb-2">Upload Image 2</p>
            <div className="flex justify-between">
              <input
                accept="image/*"
                type="file"
                name="image1"
                className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
                {...register("image1", {
                  required: "Please upload a image of car",
                })}
                onChange={changeImg}
              />

              <button
                className=" py-2 px-6 ml-6 rounded-lg mx-auto bg-blue-600 text-white"
                onClick={imgUpload}
              >
                {" "}
                Upload
              </button>
            </div>
            {progress && imageUrl[1] ? (
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-8">
                <div
                  className="bg-zinc-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: percentage }}
                >
                  {" "}
                  {progress}%
                </div>
              </div>
            ) : null}
            {errors.image1 && (
              <p className="text-red-600 text-sm">{errors.image1?.message}</p>
            )}

            <img
              src={imageUrl[1] ? imageUrl[1] : demoimg}
              className="w-full mx-auto mt-5"
              alt=""
            />
          </div>
          <div>
            <p className="font-semibold text-dark mb-2">Upload Image 3</p>
            <div className="flex justify-between">
              <input
                accept="image/*"
                type="file"
                name="image2"
                className="bg-gray-100 outline-none py-3 px-4 rounded-lg w-full"
                {...register("image2", {
                  required: "Please upload a image of car",
                })}
                onChange={changeImg}
              />

              <button
                className=" py-2 px-6 ml-6 rounded-lg mx-auto bg-blue-600 text-white"
                onClick={imgUpload}
              >
                {" "}
                Upload
              </button>
            </div>
            {progress && imageUrl[2] ? (
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-8">
                <div
                  className="bg-zinc-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: percentage }}
                >
                  {" "}
                  {progress}%
                </div>
              </div>
            ) : null}
            {errors.image2 && (
              <p className="text-red-600 text-sm">{errors.image2?.message}</p>
            )}

            <img
              src={imageUrl[2] ? imageUrl[2] : demoimg}
              className="w-full mx-auto mt-5"
              alt=""
            />
          </div>
          <div>
            <button
              className="py-2 px-6   rounded-lg mx-auto bg-blue-600 text-white"
              type="submit"
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}

export default AddCar;
