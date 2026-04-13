export async function createIncident(data) {
  await fetch("http://localhost:3000/incidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}