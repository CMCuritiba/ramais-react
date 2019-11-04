class ResponseGenerator {
  run(res, error) {
    const [errId, errMsg] = error.message.split(':');
    if (errId && errMsg) {
      return res.status(Number(errId)).json({ error: errMsg });
    }
    return res.status(500).json({ error: 'Generic Error' });
  }
}

export default new ResponseGenerator();
