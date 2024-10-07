import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const updateHostStructure = createAsyncThunk(
  "host/setStructure",
  async ({ uuid, structure }: { uuid: string; structure: string }) => {
    console.log(uuid);
    const response = await axios.post("http://localhost:3000/host/structure", {
      uuid: uuid,
      structure: structure,
    });
    if (localStorage.getItem("currentHost") === null) {
      localStorage.setItem(
        "currentHost",
        JSON.stringify({
          uuid: uuid,
          structure: structure,
          lastPage: "structure",
        })
      );
    } else if (localStorage.getItem("currentHost")) {
      const currentHost = JSON.parse(localStorage.getItem("currentHost"));
      const updatedHost = {
        ...currentHost,
        lastPage: "structure",
        structure: structure,
      };
      localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    }

    return response.data;
  }
);

export const updatePrivacyType = createAsyncThunk(
  "host/setPrivacyType",
  async ({ uuid, privacyType }) => {
    const response = await axios.post(
      "http://localhost:3000/host/privacyType",
      {
        uuid: uuid,
        privacyType: privacyType,
      }
    );

    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      lastPage: "location",
      privacyType: privacyType,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return response.data;
  }
);

export const updateFloorPlan = createAsyncThunk(
  "host/setFloorPlan",
  async ({ uuid, guests, bedrooms, beds, bathrooms }) => {
    const response = await axios.post("http://localhost:3000/host/floor-plan", {
      uuid: uuid,
      guests: guests,
      bedrooms: bedrooms,
      beds: beds,
      bathrooms: bathrooms,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      lastPage: "floorPlan",
      guests: guests,
      bedrooms: bedrooms,
      beds: beds,
      bathrooms: bathrooms,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return response.data;
  }
);

export const updateAmenities = createAsyncThunk(
  "host/setAmenities",
  async ({ uuid, amenities, safetyAmenities, uniqueAmenities }) => {
    const response = await axios.post("http://localhost:3000/host/amenities", {
      uuid,
      amenities,
      uniqueAmenities,
      safetyAmenities,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      lastPage: "photos",
      amenities: amenities,
      uniqueAmenities: uniqueAmenities,
      safetyAmenities: safetyAmenities,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return response.data;
  }
);

export const removeImageRedux = createAsyncThunk(
  "host/removeImage",
  async ({ uuid, index }) => {
    await axios.delete(`http://localhost:3000/host/deletePhoto/${index}`, {
      params: { uuid: uuid },
    });
    return { uuid, index };
  }
);

export const uploadFiles = createAsyncThunk(
  "host/uploadFiles",
  async ({ tempFiles, uuid, setFiles, files }, { dispatch }) => {
    console.log(files);
    const formdata = new FormData();
    console.log(tempFiles);
    formdata.append("uuid", uuid);
    tempFiles.forEach((file) => formdata.append("photos", file));
    const result = await axios.post(
      "http://localhost:3000/host/addPhotos",
      formdata,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const urlFiles = result.data.photos;
    console.log(urlFiles);

    setFiles((files) => [...files, ...urlFiles]);
    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      lastPage: "title",
      photos: { ...currentHost.photos, ...urlFiles },
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));

    return { newFiles: urlFiles };
  }
);

export const updateTitle = createAsyncThunk(
  "host/updateTitle",
  async ({ uuid, title }) => {
    const response = await axios.post("http://localhost:3000/host/title", {
      title,
      uuid: uuid,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      title: title,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return { title, uuid };
  }
);

export const updateDescription = createAsyncThunk(
  "host/updateDescription",
  async ({ uuid, description, highlights }) => {
    console.log(uuid, description, highlights);
    const response = await axios.post(
      "http://localhost:3000/host/description",
      {
        uuid: uuid,
        description: description,
        highlights: highlights,
      }
    );

    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      description: description,
      highlights: highlights,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return {
      uuid,
      description,
      highlights,
    };
  }
);

export const updateInstantBook = createAsyncThunk(
  "host/updateInstantBook",
  async ({ uuid, instantBook }) => {
    const response = await axios.post(
      "http://localhost:3000/host/instant-book",
      {
        uuid: uuid,
        instantBook: instantBook,
      }
    );
    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      instantBook: instantBook,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return {
      uuid,
      instantBook,
    };
  }
);

export const updateVisibility = createAsyncThunk(
  "host/updateVisibility",
  async ({ uuid, visibility }) => {
    const response = await axios.post("http://localhost:3000/host/visibility", {
      uuid: uuid,
      visibility: visibility,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      visibility: visibility,
      lastPage: "price",
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));

    return {
      visibility,
      uuid,
    };
  }
);

export const updatePrice = createAsyncThunk(
  "host/updatePrice",
  async ({ uuid, price }) => {
    const response = await axios.post("http://localhost:3000/host/price", {
      uuid: uuid,
      price: price,
    });
    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      price: price,
      lastPage: "discount",
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));

    return {
      price,
      uuid,
    };
  }
);

export const updateDiscounts = createAsyncThunk(
  "host/updateDiscounts",
  async ({ uuid, discount }) => {
    const response = await axios.post(
      "http://localhost:3000/host/setDiscount",
      {
        uuid: uuid,
        discount: discount,
      }
    );
    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      discount: discount,
      lastPage: "legal",
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));
    return {
      discount,
      uuid,
    };
  }
);

export const updateLegalInfo = createAsyncThunk(
  "host/updateLegalInfo",
  async ({ uuid, legalInfo }) => {
    const response = await axios.post(
      "http://localhost:3000/host/setLegalInfo",
      {
        uuid: uuid,
        legalInfo,
      }
    );
    const currentHost = JSON.parse(localStorage.getItem("currentHost"));
    const updatedHost = {
      ...currentHost,
      legalInfo,
    };
    localStorage.setItem("currentHost", JSON.stringify(updatedHost));

    return {
      uuid,
      legalInfo,
    };
  }
);
