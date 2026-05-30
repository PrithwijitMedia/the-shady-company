"use client";

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "next/navigation";
import {
  collection,
  getDocs
} from "firebase/firestore";

import ProtectedRoute
  from "@/components/ProtectedRoutes";

import {
  db
} from "@/lib/firebase";

import {
  driveToImageUrl
} from "@/lib/images";

export default function ProductEditor() {

  const params =
    useParams();

  const id =
    params.id as string;

const [collections, setCollections] =
  useState<any[]>([]);
  const [product, setProduct] =
    useState<any>(null);

  useEffect(() => {


    loadProduct();

  loadCollections();

  }, []);

  async function loadProduct() {


    if (id === "new") {

      setProduct({

        name: "",

        slug: "",

        price: 0,

        salePrice: 0,

        description: "",

        collection: "",

        featured: true,

        active: true,

        specifications: [],

        images: []

      });

      return;
    }

    const snapshot =
      await getDoc(
        doc(
          db,
          "products",
          id
        )
      );

    setProduct({

      id,

      specifications: [],

      images: [],

      ...snapshot.data()

    });


  }

  async function save() {


    await setDoc(

      doc(

        db,

        "products",

        id === "new"
          ? product.slug
          : id

      ),

      product

    );

    alert("Saved");


  }

  function addImage() {


    setProduct({

      ...product,

      images: [

        ...(product.images || []),

        ""

      ]

    });


  }

  function updateImage(
    index: number,
    value: string
  ) {


    const next =
      [...product.images];

    next[index] =
      value;

    setProduct({

      ...product,

      images: next

    });


  }

  function removeImage(
    index: number
  ) {


    setProduct({

      ...product,

      images:

        product.images.filter(
          (
            _: any,
            i: number
          ) => i !== index
        )

    });


  }

  function addSpecification() {


    setProduct({

      ...product,

      specifications: [

        ...(product.specifications || []),

        ""

      ]

    });


  }

  function updateSpecification(
    index: number,
    value: string
  ) {


    const next =
      [...product.specifications];

    next[index] =
      value;

    setProduct({

      ...product,

      specifications:
        next

    });


  }
async function loadCollections() {

  const snapshot =
    await getDocs(
      collection(
        db,
        "collections"
      )
    );

  setCollections(
    snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
    )
  );
}
  function removeSpecification(
    index: number
  ) {


    setProduct({

      ...product,

      specifications:

        product.specifications.filter(
          (
            _: any,
            i: number
          ) => i !== index
        )

    });


  }

  if (!product)
    return null;

  return (


    <ProtectedRoute>

      <main
        className="
    max-w-5xl
    mx-auto
    p-8
    "
      >

        <h1
          className="
      text-3xl
      font-bold
      mb-8
      "
        >
          Product Editor
        </h1>

        <div className="space-y-4">

          <input
            className="w-full border p-3"
            placeholder="Name"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value
              })
            }
          />

          <input
            className="w-full border p-3"
            placeholder="Slug"
            value={product.slug}
            onChange={(e) =>
              setProduct({
                ...product,
                slug: e.target.value
              })
            }
          />

          {/*<input
            className="w-full border p-3"
            placeholder="Collection"
            value={product.collection}
            onChange={(e) =>
              setProduct({
                ...product,
                collection: e.target.value
              })
            }
          />*/}
<div className="space-y-2">

  <label>
    Collection
  </label>

  <select
    value={
      product.collection || ""
    }
    onChange={(e) =>
      setProduct({
        ...product,
        collection:
          e.target.value
      })
    }
    className="
    w-full

    border
    border-white/15

    bg-black
    text-white

    rounded-xl

    p-3
    "
  >

    <option value="">
      None
    </option>

    {collections.map(
      (collection: any) => (

        <option
          key={collection.id}
          value={collection.slug}
        >
          {collection.name}
        </option>

      )
    )}

  </select>

</div>
          <input
            type="number"
            className="w-full border p-3"
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct({
                ...product,
                price: Number(e.target.value)
              })
            }
          />

          <input
            type="number"
            className="w-full border p-3"
            placeholder="Sale Price"
            value={product.salePrice}
            onChange={(e) =>
              setProduct({
                ...product,
                salePrice:
                  Number(e.target.value)
              })
            }
          />

          <label className="flex gap-3">

            <input
              type="checkbox"
              checked={product.featured}
              onChange={(e) =>
                setProduct({
                  ...product,
                  featured:
                    e.target.checked
                })
              }
            />

            Featured Product

          </label>

          <label className="flex gap-3">

            <input
              type="checkbox"
              checked={product.active}
              onChange={(e) =>
                setProduct({
                  ...product,
                  active:
                    e.target.checked
                })
              }
            />

            Active Product

          </label>

          <textarea
            rows={6}
            className="w-full border p-3"
            placeholder="Description"
            value={product.description}
            onChange={(e) =>
              setProduct({
                ...product,
                description:
                  e.target.value
              })
            }
          />

          <div className="border rounded-xl p-4">

            <div className="flex justify-between mb-4">

              <h2>
                Specifications
              </h2>

              <button
                onClick={addSpecification}
                className="border px-3 py-1"
              >
                Add
              </button>

            </div>

            {product.specifications?.map(
              (
                item: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="flex gap-2 mb-2"
                >

                  <input
                    className="flex-1 border p-2"
                    value={item}
                    onChange={(e) =>
                      updateSpecification(
                        index,
                        e.target.value
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      removeSpecification(index)
                    }
                  >
                    Delete
                  </button>

                </div>

              )
            )}

          </div>

          <div className="border rounded-xl p-4">

            <div className="flex justify-between mb-4">

              <h2>
                Images
              </h2>

              <button
                onClick={addImage}
                className="border px-3 py-1"
              >
                Add
              </button>

            </div>

            {product.images?.map(
              (
                image: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="mb-4"
                >

                  <div className="flex gap-2">

                    <input
                      className="flex-1 border p-2"
                      value={image}
                      onChange={(e) =>
                        updateImage(
                          index,
                          e.target.value
                        )
                      }
                    />

                    <button
                      onClick={() =>
                        removeImage(index)
                      }
                    >
                      Delete
                    </button>

                  </div>

                  {image && (

                    <img
                      src={
                        driveToImageUrl(
                          image
                        )
                      }
                      className="
                  w-48
                  rounded
                  mt-2
                  "
                    />

                  )}

                </div>

              )
            )}

          </div>

          <button
            onClick={save}
            className="
        border
        px-6
        py-3
        rounded
        "
          >
            Save Product
          </button>

        </div>

      </main>

    </ProtectedRoute>


  );
}
