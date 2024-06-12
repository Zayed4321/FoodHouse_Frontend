import React from 'react'
// We received all the values such as name, setName, handleCategorySubmit here and this means that the value changes itself to name for example
const CategoryForm = ({ handleCategorySubmit, value, setValue, setModal }) => {
    return (
        <>
            <form onSubmit={handleCategorySubmit} >
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Write a New Category name</span>
                    </div>
                    <input type="text" placeholder="Enter Here" className="input input-bordered w-full max-w-xs" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button type='submit' className='btn btn-primary mt-3' onClick={() => setModal(false)} > Add Now </button>
                </label>
            </form>
        </>
    )
}

export default CategoryForm