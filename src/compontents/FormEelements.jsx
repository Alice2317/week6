export const InputDom = ({ register, errors, id, labelText, type, rules }) => {
  return <>
    <label htmlFor={id} className='form-label'>
      {labelText}
    </label>
    <input
      id={id}
      type={type}
      {...register(id, rules)}
      className={`form-control ${errors[id] && 'is-invalid'}`}
    />
    {errors[id] && (
      <div className='invalid-feedback'>{errors[id]?.message}</div>
    )}
  </>
}
