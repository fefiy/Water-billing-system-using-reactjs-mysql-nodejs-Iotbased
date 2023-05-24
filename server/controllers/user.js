


const softDeleteRecord = (id) => {
    const query = 'UPDATE users SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
    pool.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error executing soft delete query:', error);
        return;
      }
      console.log('Record soft deleted');
    });
  };




  module.exports = {
    softDeleteRecord
  }