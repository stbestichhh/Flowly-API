describe('Health status', () => {
  it('Auth', async () => {
    const response = await fetch('http://localhost:9110');
    expect(response.ok).toBeTruthy();
  });
});
