export default async function deleteProject(id) {
  try {
    const url = `${window.location.protocol}//${window.location.host}/project/${id}`;
    console.log(url);
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log('🌠🌠🌠🌠');
      console.log(await response.json());
      // Permitiendo recargar la pagina
      window.location.reload();
    } else {
      throw new Error(
        `Error al borrar elemento con el ID ${id}: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(error.message);
  }
}
