export async function GET(request) {
    const token = request.headers["Authentication"]
    console.log(token)
    // Lakukan sesuatu dengan permintaan
    const posts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];

    return Response.json(posts);
  }
  